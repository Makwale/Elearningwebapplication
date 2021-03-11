export class QuizHistory{
    id:string;
    marks: number;
    date: Date;

    constructor(id: string, date,  marks: number){
        this.id = id;

        this.marks = marks;
        
        this.date = date.toDate();
    }
}