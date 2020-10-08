import { Injectable } from '@angular/core'; 
import { Question } from '../models/question';

@Injectable({
    providedIn: 'root'
}) 
export class OpenTriviaService{ 

    constructor(){}
    
    public getQuestions(nbQuestions : number, difficulty : string):
        Promise<Array<Question>> {
            return new Promise((resolve, reject) => {
                resolve ([
                    { 
                        category: "Entertainment: Japanese Anime & Manga", 
                        type: "multiple", 
                        difficulty: "easy", 
                        question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", 
                        correct_answer: "The Salamander", 
                        incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] 
                        },
                    { 
                        category: "Entertainment: Video Games", 
                        type: "boolean", 
                        difficulty: "medium", 
                        question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", 
                        correct_answer: "False", 
                        incorrect_answers: ["True"] 
                    }
                        
                ])
            })
    }



    public replaceHTMLCaracter(datas: Array<Question>) { 


        for (let current of datas) 
        { 
        console.log("Before replacement :"); 
        console.log(current); 
        
        
        var regexp = /&#039;/gi; 
        current.question = current.question.replace(regexp, "'"); 
        
        var regexp = /&quot;/gi; 
        current.question = current.question.replace(regexp, "\""); 
        
        console.log("After :") 
        console.log(current); 
        }
    } 
    
}





