import { Component, OnInit } from '@angular/core';
import { ApiService } from './api-service.service';
import { Question } from './question.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

 constructor(private apiService:ApiService){}
  questions = []
  enableQuestions = 1;
  cuurQuestionIndex = 0;
  
  ngOnInit(){
    this.apiService.allQuestionsChanged.subscribe((_questions: Question[]) => {
      this.questions = _questions.slice();
    });

    this.apiService.enableQuestionsCountChanged.subscribe((_enableQuestions: number) => {
      this.enableQuestions = _enableQuestions;
    });
  }

}
