import { Injectable } from '@angular/core';
import { InstructorAccount } from 'src/app/Model/Instructor-Model/instructor.account.model';
import { InstructorClass } from 'src/app/Model/Instructor-Model/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorAccountService {
  private instructorAccount: InstructorAccount;
  constructor() {
    //Calling the default Conctructor
    this.instructorAccount = new InstructorAccount(); 
  }
   public setInstructorAccount(_instructor: InstructorAccount){
    this.instructorAccount = _instructor;
   }
   public getInstructorAccount(){
     return this.instructorAccount;
   }
}
