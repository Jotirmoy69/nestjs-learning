import { Controller, Get } from '@nestjs/common';
import { EvService } from './ev.service';


@Controller('ev')
export class EvController {
    constructor(private readonly evService: EvService) { }

    @Get('db-uri')
    getDBUri(): string {
        try {
        return this.evService.getDBUri() || 'No DB URI found';
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}
