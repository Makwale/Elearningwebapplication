import { InstructorClass } from 'src/app/Model/Instructor-Model/instructor.model';

export class InstructorAccount{
    private isSignedIn: boolean;
    private instructor: InstructorClass;
    constructor(){
        this.isSignedIn = false;
        this.instructor = new InstructorClass();
    }
    public overloadInstructor(_isSignedIn: boolean, _instructor: InstructorClass){
        this.isSignedIn = _isSignedIn;
        this.instructor =  _instructor;
    }
    public setSignIn(_isSignedIn: boolean){
        this.isSignedIn = _isSignedIn;
    }
    public setInstructor(_instructor:InstructorClass) {
        this.instructor = _instructor;
    }
    public getSignInStatus(): boolean{
        return this.isSignedIn;
    }
    public getInstructor(): InstructorClass{
        return this.instructor;
    }
}