import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Announcement } from 'src/app/Model/announcement.model';
import { QuestionResults } from 'src/app/Model/questionresults.model';
import { Test } from 'src/app/Model/test.model';
import { DatabaseService } from 'src/app/services/database.service';
import { CreateannouncementPage } from '../createannouncement/createannouncement.page';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  // exam: Test;

  // questions = [];

  // answer;

  // questionResults: QuestionResults[] = [];

  // totalMartks = 0;

  studentsAnnouncements: Announcement[] = [];

  instructorsAnnouncements: Announcement[] = [];

  constructor(private dbs: DatabaseService, public modalController: ModalController) { }

  ngOnInit() {

    this.dbs.getAnnouncements().subscribe( data =>{
      data.forEach(anndata =>{
        let announcementdata = anndata.payload.doc.data();
        
        let annouObject = new Announcement(announcementdata["date"], announcementdata["message"], announcementdata["category"], anndata.payload.doc.id,);

        if(annouObject.category == "s"){
          if(!this.searchStudentsA(annouObject))
            this.studentsAnnouncements.push(annouObject);
        }else{
          if(!this.searchInA(annouObject))
            this.instructorsAnnouncements.push(annouObject);
        }
      })
    })
      
  }

  test(){

   
  }

  done(){
    // for(let questionResult of this.questionResults)
    //   if(questionResult.answer == questionResult.yourAnswer){
    //     this.totalMartks++;
    //   }
  }

  submit(question, answer){
    

    // this.questionResults.push(new QuestionResults(question.question, question.answer ,answer ))

  }

  enable(ref){
    ref.disabled = false;
  }

  save(ref, id){
    
    this.dbs.updateAnnouncement(id, ref.value).then(() =>{
      ref.disabled = true;
      alert("Post updated")
    })
  }

  async createAnnouncement(){
    const modal = await this.modalController.create({
      component: CreateannouncementPage,
      
    });
    await modal.present();
  }

  searchStudentsA(ann: Announcement): boolean{
    for(let studA of this.studentsAnnouncements){
      if(studA.id == ann.id){
        return true;
      }
    }

    return false;
  }

  searchInA(ann: Announcement): boolean{
    for(let studA of this.instructorsAnnouncements){
      if(studA.id == ann.id){
        return true;
      }
    }

    return false;
  }

 

}
