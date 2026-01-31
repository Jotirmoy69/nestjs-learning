import { Injectable, NotFoundException } from '@nestjs/common'; 

@Injectable()
export class StudentService {
    private students = [
        {id:1,name:"Jotirmoy",age:20},
        {id:2,name:"Rahul",age:21},
        {id:3,name:"Rohit",age:22},
        {id:4,name:"Sachin",age:23},
        {id:5,name:"Virat",age:24},
        {id:6,name:"Dhoni",age:25},
    ];

    
    getStudentById(id:number){
        const found = this.students.find((student:any) => student.id === id);
        if(!found){
            throw new NotFoundException("non existing student");
        }
        return found;
    }

    getAllStudents(){
            return this.students;
        }

    //post
    createStudent(student:{name:string,age:number}){
        
        const {name,age} = student;
        this.students.push({id:(this.students.length+1),...student});

        return this.students
    }

    //put
    updateStudent(id:number,student:{name:string,age:number}){ 
        const index:number = this.students.findIndex((student:any) => student.id === id);

        if( index === -1){
            throw new NotFoundException("non existing student");
        }
        else{
            this.students[index] = {...this.students[index],...student};
          
        }

        return this.students[index]

    }

    deleteStudent(id:number){
        const index = this.students.findIndex((student:any) => student.id === id);
        if( index === -1){
            throw new NotFoundException("non existing student");
        }
        else{
            this.students.splice(index,1);
        }

        return this.students
    }


}
