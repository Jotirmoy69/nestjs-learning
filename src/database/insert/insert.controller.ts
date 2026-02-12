import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { InsertService } from './insert.service';
import { users } from './user.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('insert')
export class InsertController {
    constructor(private readonly insertService: InsertService) {}

    @Post()
     async insertUser(@Body() user: Partial<users>): Promise<users> {
        try {
        const newYser = await this.insertService.insertUser(user);
            return { id: newYser.id, name: newYser.name, position: newYser.position };
        } catch (error) {
            throw new Error(error.message);
        } 
    }

    @Get()
    @UseGuards(SupabaseAuthGuard)
    async getAllUsers(): Promise<users[]> {
        try {
            const users = await this.insertService.getAllUsers();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<users> {
        try {
            const user = await this.insertService.getUserById(Number(id));
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() user: Partial<users>): Promise<users> {
        try {
            const updatedUser = await this.insertService.updateUser(Number(id), user);
            return updatedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<users> {
        try {
            const deletedUser = await this.insertService.deleteUser(Number(id));
            return deletedUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}   
