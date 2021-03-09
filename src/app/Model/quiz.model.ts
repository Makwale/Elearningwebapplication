
export class Quiz{

    id: string;

    lesson_id:string;

    total_marks: number;

    duration: number;

    questions = [];



    constructor(id: string, lesson_id: string, total_marks: number, duration: number, questions){
        this.id = id;

        this.lesson_id = lesson_id;

        this.total_marks = total_marks;

        this.duration = duration;

        this.questions = questions;

    }

}