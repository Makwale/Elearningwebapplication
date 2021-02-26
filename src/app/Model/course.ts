export class Course{

     public id: string;
     public name: string;
     public ratings: number;
     public imgURL:string;
     public category:string;
     public price: number;
     public instructor_id: string;

     constructor(id: string, name: string, ratings: number, imgURL: string, category: string, price: number, instructor_id: string){
         this.id = id;

         this.name = name;

         this.ratings = ratings;

         this.imgURL = imgURL;

         this.category = category;

         this.price = price;

         this.instructor_id = instructor_id;
     }

    public equal(course: Course): boolean{
        if(this.id == course.id){
            alert("Equal");
            return true;
        }

        alert("Not Equal");
        return false;
    }

 }