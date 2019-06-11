export class Question {
    constructor(public category:string, 
                public correct_answer:string, 
                public difficulty:string,
                public question:string, 
                public type:string, 
                public incorrect_answers:[string]){    }
}