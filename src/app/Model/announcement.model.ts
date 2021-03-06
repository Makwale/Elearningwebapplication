export class Announcement{
    id?: string;
    date: Date;
    message: string;
    category: string;

    constructor( date, message, category, id?: string){

        this.id = id;

        this.date = date.toDate();

        this.message = message;

        this.category = category;

    }
}