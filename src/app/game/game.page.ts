import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../providers/open-trivia.provider';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public pseudo: string = "chlorella";
  public difficulty: string = "easy";
  public error: string = "";
  public beginGame: boolean = false;
  public nextQuestion: boolean = false;
  public nbQuestions: number = 2;
  public questions = [];
  public endGame: boolean = false;
  public indexQuestion: number = 0;
  public points: number = 0;
  public indexQuestionAnswered: number = -1;
  public questionCourante: any;

  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private startService: OpenTriviaService,
    private router: Router,
    private route : ActivatedRoute,
    private navCtrl : NavController) { }

  ngOnInit() {
    this.displayQuestions();
    this.route.params.subscribe((params) => {
      this.difficulty = params['difficulty'];
      this.pseudo = params['pseudo'];

    }
    )
  }

  // public async StartGame() {
  //   console.log("CALL startGame");
  //   this.error = "";

  //   if (!this.pseudo || this.pseudo.length < 3) {
  //     this.error = 'Your pseudo is too short (3 caracters minimum)';
  //     const alert = await this.alertCtrl.create({
  //       header: 'Pseudo',
  //       message: 'Your pseudo is too short (3 caracters minimum)'
  //     });
  //     alert.present();
  //     return;
  //   }
  //   if (this.difficulty === undefined) {
  //     this.error = 'Please, choose the difficulty';
  //     const alert = await this.alertCtrl.create({
  //       header: 'Difficulty',
  //       message: 'Please, choose the difficulty'
  //     });
  //     alert.present();
  //     return;
  //   }
  //   this.displayQuestions();
  //   this.beginGame = true;
  // }

  async displayQuestions() {
    this.endGame = false;
    this.nextQuestion = false;
    this.indexQuestion = 0;
    this.indexQuestionAnswered = -1;
    this.points = 0;
    try {
      this.questions = await this.startService.getQuestions(10, this.difficulty);
      this.loadQuestion();
    } catch (error) {
      const toast = await (this.toastCtrl.create({
        message: error
      }));
      toast.present;
    }
    //Remplacer les caractères HTML en TypeScript -- avant l'affichage
    this.startService.replaceHTMLCaracter(this.questions);
    this.questions = this.shuffleArray(this.questions);

  }

  loadQuestion() {

    this.questionCourante = this.questions[this.indexQuestion];
    this.questionCourante["answers"] = [];
    for (let answer of this.questionCourante["incorrect_answers"]) {
      this.questionCourante["answers"].push({
        correct: false,
        answer: answer
      });
    }
    this.questionCourante["answers"].push({
      correct: true,
      answer: this.questionCourante["correct_answer"]
    })
    this.questionCourante["answers"] = this.shuffleArray(this.questionCourante["answers"]);

  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  reponse(answer: string) {

    this.nextQuestion = true;
    if (answer["correct"] && this.indexQuestionAnswered !== this.indexQuestion) {
      this.points++;
    }
    this.indexQuestionAnswered = this.indexQuestion;
    if (this.indexQuestion >= this.questions.length - 1) {
      this.endGame = true;
    }
  }

  nextQtion() {
    if (this.indexQuestion < this.questions.length - 1) {
      this.indexQuestion++;
      this.nextQuestion = false;
      this.loadQuestion();
    }
  }
  async score() {
    this.questionCourante = null;
    this.router.navigate(['/score', this.points]);

  }

  return() {
    this.beginGame = false;
  }

}
