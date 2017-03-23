import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { ClassifiedModel } from "../../models/classified.model";
import { ClassifiedVesselTypePage } from '../classified-vessel-type/classified-vessel-type';

/*
  Generated class for the Classified page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified',
  templateUrl: 'classified.html'
})
export class ClassifiedPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  classifiedVesselTypePage: any = ClassifiedVesselTypePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.classified = new ClassifiedModel();
      this.classified.user_id = this.current_user.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedPage');
  }

  openNextPage(page, classified){
    this.navCtrl.push(page, {'classified': classified});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
