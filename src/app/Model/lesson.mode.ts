import { IonDatetime } from "@ionic/angular";

export class Lesson{
    id: string;
    videoURL: string;
    date: Date;
    course_id: string;
    name: string;
    number: number
    docURL: string;

    constructor(id: string, name: string, number: number, vidoeURL: string, docURL, date: Date, course_id){
        
        this.id = id;

        this.name = name;
        
        this.videoURL = vidoeURL;

        this.date = date;

        this.course_id = course_id;

        this.number = number;

        this.docURL = docURL;
    }

    
}