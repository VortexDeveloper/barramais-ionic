import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Registration3Page } from '../registration-3/registration-3'
import { UserModel } from "../../models/user.model";

/*
  Generated class for the Registration2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration-2',
  templateUrl: 'registration-2.html'
})
export class Registration2Page {

  user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.user = navParams.data.user ? navParams.data.user : this.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration2Page');
  }

  next(user) {
    this.navCtrl.push(Registration3Page, { user: user });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
