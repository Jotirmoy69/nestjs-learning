import { Controller,Get, Post , Param , Body, Put, Delete } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService:StudentService){}

    @Get()
    getAllStudents(){
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getStudentById(@Param("id") id:number){
        return this.studentService.getStudentById(Number(id));
    }

    @Post()
    createStudent(@Body() student:{name:string,age:number}){
        return this.studentService.createStudent(student);
    }

    @Put(':id')
    updateStudent(@Param("id") id:number,@Body() student:{name:string,age:number}){
        return this.studentService.updateStudent(Number(id),student);
    }

    @Delete(":id") 
    deleteStudent(@Param("id") id:number){
        return this.studentService.deleteStudent(Number(id));
    }
}
