import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Question } from './question.model';


@Injectable()
export class ApiService {
  questions = [];
  enableQuestions = 0;
  curQuestionIndex = 0;
  constructor(private http:Http) {
    this.getQuestions();
  }
  currQuestion : Question = new Question("", "", "","","",[""])
  currQuestionChanged = new EventEmitter<Question>();
  allQuestionsChanged = new EventEmitter<Question[]>();
  enableQuestionsCountChanged = new EventEmitter<number>();

  getQuestions() {
    return this.http.get("https://opentdb.com/api.php?amount=10&type=multiple").subscribe((responce:Response) => {
      let json = responce.json();

      json['results'].forEach(element => {
        let q : Question = new Question(element['category'], element['correct_answer'],element['difficulty'],element['question'],element['type'],element['incorrect_answers']);
        this.questions.push(q);
      });
      
      this.currQuestion = this.questions[0];
      this.currQuestionChanged.emit(this.currQuestion);
      this.allQuestionsChanged.emit(this.questions);
      this.enableQuestions = 1 
      this.enableQuestionsCountChanged.emit(this.enableQuestions);
      
      console.log(this.questions);

    });;
  }

  getNextQuestion() : boolean{
    if(this.curQuestionIndex < (this.questions.length - 1)) {
      this.curQuestionIndex++
      this.currQuestion = this.questions[this.curQuestionIndex]
      this.currQuestionChanged.emit(this.currQuestion);
      this.enableQuestions ++
      this.enableQuestionsCountChanged.emit(this.enableQuestions);
      return true;
    }
    return false;
  }
}

