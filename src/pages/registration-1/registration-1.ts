import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Registration2Page } from '../registration-2/registration-2'
import { UserModel } from "../../models/user.model";
import { HomePage } from "../home/home";

/*
  Generated class for the Registration1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration-1',
  templateUrl: 'registration-1.html'
})
export class Registration1Page {

  user: UserModel = new UserModel();
  rootPage = HomePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration1Page');
  }

  next(user) {
    this.navCtrl.push(Registration2Page, { user: user });
  }

  goBack() {
    this.navCtrl.pop();
  }

  openPage(page){
    this.navCtrl.push(page);
  }

}
