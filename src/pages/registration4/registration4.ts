import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { User } from '../../providers/user';

/*
  Generated class for the Registration4 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration4',
  templateUrl: 'registration4.html'
})
export class Registration4Page {

  user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public viewCtrl: ViewController
  ) {
    this.user = navParams.data.user ? navParams.data.user : this.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration4Page');
  }

}
