import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";

/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User
  ) {}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  save(user) {
    this.userProvider.create(user);
  }

  goBack() {
    this.navCtrl.pop();
  }

}
