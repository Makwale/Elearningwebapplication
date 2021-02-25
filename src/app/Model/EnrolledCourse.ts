export class EnrolledCourse{
      private  email:string;
       private course_id:string;
        constructor(email:string,course_id:string){
                this.email = email;
                this.course_id = course_id;
        }
        public setEmail(email:string){
                this.email = email;
        }
        public setCourseID(courseid:string){
                this.course_id = courseid;
        }
        public getEmail(){
                return this.email;
        }
        public getCourseID(){
                return this.course_id;
        }

 }