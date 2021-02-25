import { IonDatetime } from "@ionic/angular";

export class Lesson{
    id: string;
    videoURL: string;
    date: Date;
    course_id: string;

    constructor(id: string, vidoeURL: string, date: Date, course_id){
        this.id = id;
        
        this.videoURL = vidoeURL;

        this.date = date;

        this.course_id = course_id;
    }

    
}