worimport { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
/*
  Generated class for the Registration3 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration-3',
  templateUrl: 'registration-3.html'
})
export class Registration3Page {

  user: UserModel = new UserModel();
  avatar: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public viewCtrl: ViewController
  ) {
    this.user = navParams.data.user ? navParams.data.user : this.user;
    viewCtrl.getContent(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration3Page');
  }

  save(user) {
    this.userProvider.create(user);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
