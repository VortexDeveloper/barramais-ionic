import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { Classified } from '../../providers/classified';
import { ClassifiedFishingPage } from '../classified-fishing/classified-fishing';
import { MainPage } from '../main/main';
import { ClassifiedPage } from '../classified/classified';

/*
  Generated class for the ClassifiedShowFishings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-show-fishings',
  templateUrl: 'classified-show-fishings.html'
})
export class ClassifiedShowFishingsPage {
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');
  fishings: any[] = [];
  classifieds: any[] = [];
  isClassifiedEmpty: boolean = true;
  mainPage: any = MainPage;
  classifiedPage: any = ClassifiedPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public classifiedProvider: Classified
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.getFishings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedShowFishingsPage');
  }

  getFishings(){
    this.classifiedProvider.getAllFishingsByDate()
      .subscribe(response => {
        this.fishings = response;
        for(var i = 0; i < this.fishings.length; i++){
          this.getClassified(i);
        }
        if(this.classifieds.length > 0){
          this.isClassifiedEmpty = false;
        }
        console.log(this.classifieds);
      }, error => {
        console.log(error.json());
      });
  }

  getClassified(index){
    this.classifiedProvider.getClassified(this.fishings[index].classified_id)
      .subscribe(response => {
        this.classifieds.push(response);
        console.log(this.classifieds);
      }, error => {
        console.log(error.json());
      });
  }

  openPageWithClassifiedConditional(page, classifiedConditional){
    this.navCtrl.push(page, {'classifiedConditional': classifiedConditional});
  }

  goBack(){
    this.navCtrl.setRoot(this.mainPage);
  }

}