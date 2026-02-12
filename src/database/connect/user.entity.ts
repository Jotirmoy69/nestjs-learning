import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class students {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}