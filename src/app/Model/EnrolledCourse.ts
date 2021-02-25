export class EnrolledCourse{
      private  student_id:string;
       private course_id:string;
        constructor(id:string,course_id:string){
                this.student_id = id;
                this.course_id = course_id;
        }
        public setStudentid(id:string){
                this.student_id = id;
        }
        public setCourseID(courseid:string){
                this.course_id = courseid;
        }
        public getStudentID(){
                return this.student_id;
        }
        public getCourseID(){
                return this.course_id;
        }

 }