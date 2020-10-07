import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OpenTriviaService } from '../services/OpenTriviaService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pseudo : string = "chlorella";
  public difficulty : string = "Easy" ;
  public error : string = "";
  public isVisibleForm : boolean = true;
  public nextQuestion : boolean = false;
  public nbQuestions : number = 2;
  public questions = [];

  constructor(private alertCtrl : AlertController,
    private startService: OpenTriviaService) {}

  ngOnInit() {}

  public async StartGame(){
    console.log("CALL startGame");
    this.error = "";

    if(!this.pseudo || this.pseudo.length < 3) { 
      this.error = 'Your pseudo is too short (3 caracters minimum)'; 
      const alert = await this.alertCtrl.create({ 
        header : 'Pseudo', 
        message:'Your pseudo is too short (3 caracters minimum)' 
      }); 
      alert.present();
      return; 
    } 
    if(this.difficulty === undefined) { 
      this.error = 'Please, choose the difficulty'; 
      const alert = await this.alertCtrl.create({ 
        header : 'Difficulty', 
        message:'Please, choose the difficulty'
      }); 
      alert.present();
      return; 
    } 
      this.displayQuestions();
  }

  private displayQuestions(){
    this.isVisibleForm = false;
  
     this.startService.getQuestions(this.nbQuestions, this.difficulty) 
     .then((resultat) => { this.questions = resultat; }) 
     .catch(async (err) => { 
       const alert = await this.alertCtrl.create({ 
         header: 'Erreur appel Serveur', 
         message: 'Impossible de récupérer la liste de films' 
       }); 
       alert.present(); 
     });

     this.startService.replaceHTMLCaracter(this.questions);

    }




   


  private reponse(answer){
  
    return this.nextQuestion = true;
  } 
}
