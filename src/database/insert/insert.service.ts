import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InsertService {
    constructor(
        @InjectRepository(users)
        private usersRepository: Repository<users>,
    ) {}

    async insertUser(user: Partial<users>): Promise<users> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async getAllUsers(): Promise<users[]> {
        return this.usersRepository.find();
    }

    async getUserById(id: number): Promise<users> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if(!user){
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async updateUser(id: number, user: Partial<users>): Promise<users> {
        const existingUser = await this.usersRepository.findOne({ where: { id } });
        if(!existingUser){
            throw new NotFoundException(`User with id ${id} not found`);
        }
        const updatedUser =  Object.assign(existingUser, user);
        return this.usersRepository.save(updatedUser);
    }

    async deleteUser(id: number): Promise<users> {
        const existingUser = await this.usersRepository.findOne({ where: { id } });
        if(!existingUser){
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return this.usersRepository.remove(existingUser); 
    }

    async search(filter:{name?:string,position?:string}):Promise<users[]>{
        const query = this.usersRepository.createQueryBuilder('user');
        if(filter.name){
            query.andWhere('user.name ILIKE :name', { name: `%{filter.name}%` });
        }
        if(filter.position){
            query.andWhere('user.position ILIKE :position', { position: `%{filter.position}%` });
        }
        return query.getMany();
    }
}
