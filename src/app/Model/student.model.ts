import { callbackify } from "util";

export class Student{
    
    private studentNumber: string;
    private firstname: string;
    private lastname: string;
    private phone: string;
    private gender: string;
    private email: string;

    constructor(studentNumber: string, firstname: string, lastname: string, phone: string, gender: string, email: string){
        this.studentNumber = studentNumber;

        this.firstname = firstname;

        this.lastname = lastname;

        this.phone = phone;

        this.gender = gender;

        this.email = email;

    }

    public getStudentNumber(){ 
        return this.studentNumber;
    }

    public geteName(){
        return this.firstname;
    }

    public getSurname(){
        return this.lastname;
    }

    public getGender(){
        return this.gender;
    }
    
    public getPhone(){
        return this.phone;
    }

    public getEmail(){
        return this.email;
    }
}