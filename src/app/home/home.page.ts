import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pseudo : string = "";
  public difficulty : string = "Easy" ;
  public error : string = "";
  public isVisibleForm : boolean = true;
  public nextQuestion : boolean = false;
  constructor(private alertCtrl : AlertController) {}

  ngOnInit() {}

  public async StartGame(){
    console.log("CALL startGame");
    this.error = "";

    if(!this.pseudo || this.pseudo.length <= 3) { 
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
    return this.isVisibleForm = false;
  }

  private reponse(answer){
  
    return this.nextQuestion = true;
  } 
}
