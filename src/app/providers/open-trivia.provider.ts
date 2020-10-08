import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OpenTriviaService {

    constructor(private httpClient: HttpClient) { }

    public async getQuestions(nbQuestions: number, difficulty: string):
        Promise<Array<Object>> {

            const res = await this.httpClient.get("https://opentdb.com/api.php?amount=" + nbQuestions + "&difficulty=" + difficulty).toPromise();
            if (res && res["results"]) {
                return res["results"];
            } else {
                throw Error("Impossible de récupérer les questions");
            }
    }



    public replaceHTMLCaracter(datas: Array<Question>) {


        for (let current of datas) {
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





