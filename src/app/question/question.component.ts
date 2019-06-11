import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../question.model';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  
  @ViewChild('form') form :NgForm 
  genders = ['male', 'femle', "blabla", "new bla bla"]
  questionTitel = "" 
  answers = ["", "", "", ""]
  correctAnswers = "";
  ifAnswered = false;
  imageSrc = "";
  buttonText = "OK"
  ifEndedQuestion = false;
  checkedClass = 'option-button option-checked row';

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.currQuestionChanged.subscribe((_question:Question) => {
      this.questionTitel = _question.question;
      this.correctAnswers = _question.correct_answer;
      this.answers = _question.incorrect_answers.slice();
      this.answers.push(_question.correct_answer);
      this.ifAnswered = false;
      this.buttonText = "OK"
      this.checkedClass = 'option-button option-checked row';
    });
  }

  onSubmit(){
    if(this.buttonText === "OK"){
      this.ifAnswered = true;

      if(this.form.value['answer'] == this.correctAnswers){
        this.imageSrc = "assets\\images\\Group.png";
        this.checkedClass = 'option-right option-button row';
      }else{
        this.imageSrc = "assets\\images\\Group 3.png";
        this.checkedClass = 'option-wrong option-button row';
      }

      this.buttonText = "Continue";
      console.log(this.form.value['answer']);
    } else {
      if (!this.apiService.getNextQuestion()){
        this.ifEndedQuestion = true;
        alert("No more questions");
      }
    }    
  }
}
