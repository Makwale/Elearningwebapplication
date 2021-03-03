export class InstructorClass{
    private instructorID: string;
    private firstname: string;
    private lastname: string;
    private phone: string;
    private gender: string;
    private email: string;
    private biography: string;
    private profession: string;
    private experience: number;
    private deailedExperience: string;
    private status: string;
    private numCourses: number;
    private numStudents: number;


    constructor(){
        this.instructorID = "xxxxxxxxxxxxxxxxxxx";
        this.firstname = "User_First_name";
        this.lastname = "user_last_name";
        this.phone = "0123456789";
        this.gender = "male";
        this.email = "username@123.co.xc";
        this.biography = "More about myself";
        this.profession = "Instructor Applicant";
        this.experience = 0;
        this.deailedExperience = "";
        this.status = "Pending"; 
        this.numCourses = 0;
        this.numStudents = 0;
    }
    overloadInstructor(_instructorID: string, _firstname: string, _lastname: string, _phone: string, _gender: string, _email: string, _bio:string, _prof:string, _exp:number, _details:string,_status:string, _numCourses: number, _numStudent: number){
        this.instructorID = _instructorID;
        this.firstname = _firstname;
        this.lastname = _lastname;
        this.phone = _phone;
        this.gender = _gender;
        this.email = _email;
        this.biography = _bio;
        this.profession = _prof;
        this.experience = _exp;
        this.deailedExperience = _details;
        this.status = _status;
        this.numCourses = _numCourses;
        this.numStudents = _numStudent;
        
    }
    //Setters -- Set Attributes one by one
    public setInstructor(_instructorID:string){
        this.instructorID = _instructorID;
    }
    public setFirstName(_firstname:string){
        this.firstname = _firstname;
    }   
    public setlLastName(_lastname:string){
        this.lastname = _lastname;
    }
    public setPhone(_phone:string){
        this.phone = _phone;
    } 
    public setGender(_gender:string){
        this.gender = _gender;
    }   
    public setEmail(_email:string){
        this.email = _email;
    }
    public setBiography(_bio:string){
        this.biography = _bio;
    }
    public setNumberOfCourses(_courses:number){
        this.numCourses = this.numCourses + _courses;
    }
    public setNumberOfStudents(_students:number){
        this.numStudents = this.numStudents + _students;
    }
    public setProfession(_profession:string){
        this.profession = _profession;
    }
    public setStatus(_status:string){
        this.status = _status;
    }
    public setExperience(_exp:number){
        this.experience = _exp;
    }
    public setDetailedExperience(_detailExp:string){
        this.deailedExperience = _detailExp;
    }
//Getters - Get/retrieve/return methods one by one
    public getInstructorNumber(){ 
        return this.instructorID;
    }
    public getName(){
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
    public getBiography(){
        return this.biography;
    }
    public getNumberOfCourses(){
        return this.numCourses;
    }
    public getNumberOfStudents(){
        return this.numStudents;
    }
    public getProfession(){
        return this.profession;
    }
    public getStatus(){
        return this.status;
    }
    public getExperience(){
        return this.experience;
    }
    public getDetailedExperience(){
        return this.deailedExperience;
    }
}