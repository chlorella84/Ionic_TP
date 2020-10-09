import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  public score : number;

  constructor(private route : ActivatedRoute,
    private navCtrl : NavController) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.score = params['points'];
    })
  }

  return(){
    this.navCtrl.navigateRoot("/");
  }
}
