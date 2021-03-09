export class QuestionResults{

    question: string;

    answer: string;

    marks: number;

    student_answer: string;

    constructor(question: string, answer : string, marks: number, yourAnswer: string){
        this.question = question;

        this.answer = answer;
        
        this.marks = marks;

        this.student_answer = yourAnswer;
    }
    
}