import { IsIn, IsInt, IsString } from "class-validator";

export class createCustomerDto{ 
    @IsString()
    name: string;
    @IsString()
    email: string;
    @IsInt()
    age: number;
};
