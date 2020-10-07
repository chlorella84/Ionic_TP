import { Injectable } from '@angular/core'; 
import { Question } from '../models/question';

@Injectable() 
export class OpenTriviaService{ 

    public getQuestions(nbQuestions : number, difficulty : string):
        Promise<Array<Question>> {
            return new Promise((resolve, reject) => {
                resolve ([
                    { 
                        Category: "Entertainment: Japanese Anime & Manga", 
                        Type: "multiple", 
                        Difficulty: "easy", 
                        Question: "In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?", 
                        Correct_answer: "The Salamander", 
                        Incorrect_answers: ["The Dragon Slayer", "The Dragon", "The Demon"] 
                        },
                    { 
                        Category: "Entertainment: Video Games", 
                        Type: "boolean", 
                        Difficulty: "medium", 
                        Question: "&quot;Return to Castle Wolfenstein&quot; was the only game of the Wolfenstein series where you don&#039;t play as William &quot;B.J.&quot; Blazkowicz.", 
                        Correct_answer: "False", 
                        Incorrect_answers: ["True"] 
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
        current.Question = current.Question.replace(regexp, "'"); 
        
        var regexp = /&quot;/gi; 
        current.Question = current.Question.replace(regexp, "\""); 
        
        var regexp = /&eacute;/gi; 
        current.Question = current.Question.replace(regexp, "é"); 
        
        var regexp = /&auml;/gi; 
        current.Question = current.Question.replace(regexp, "ë"); 
        console.log("After :") 
        console.log(current); 
        }
    } 
    
}





