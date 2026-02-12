import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private jwks: jwksClient.JwksClient;

  constructor(private config: ConfigService) {
    // Connect to Supabase's public key endpoint
    const supabaseUrl = this.config.get<string>('SUPABASE_URL');
    this.jwks = jwksClient({
      jwksUri: `${supabaseUrl}/auth/v1/.well-known/jwks.json`,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Get the token from the request header
    const req = context.switchToHttp().getRequest<Request>();
    const token = this.getToken(req);

    // 2. Verify the token and get the user data
    const user = await this.verifyToken(token);

    // 3. Attach user data to the request so controllers can use it
    req['user'] = user;

    return true;
  }

  // Extract the token from "Bearer <token>"
  private getToken(req: Request): string {
    const header = req.headers['authorization'];
    if (!header || !header.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    return header.split(' ')[1];
  }

  // Verify the token using Supabase's public key
  private async verifyToken(token: string): Promise<jwt.JwtPayload> {
    // Read the token header to find which key was used to sign it
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    // Get the matching public key from Supabase
    const key = await this.jwks.getSigningKey(decoded.header.kid);
    const publicKey = key.getPublicKey();

    // Verify the token is real and not tampered with
    try {
      return jwt.verify(token, publicKey, {
        algorithms: ['ES256'],
      }) as jwt.JwtPayload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
