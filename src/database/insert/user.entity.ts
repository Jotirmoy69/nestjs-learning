import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class users {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column({nullable:false})
    position: string;
 
}