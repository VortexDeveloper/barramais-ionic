import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { Registration4Page } from '../registration4/registration4';

@Component({
  selector: 'page-registration-3',
  templateUrl: 'registration-3.html'
})
export class Registration3Page {

  user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public viewCtrl: ViewController
  ) {
    this.user = navParams.data.user ? navParams.data.user : this.user;
    // viewCtrl.getContent(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration3Page');
  }

  save(user) {
    this.userProvider.create(user)
    .subscribe(user_params => {
      if(user_params.errors) {

      } else {
        this.user = new UserModel(user_params);
        this.move_to_photopage(this.user);
      }
    }, error => {
        console.log(JSON.stringify(error.json()));
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  move_to_photopage(user: UserModel) {
    this.navCtrl.push(Registration4Page, { user: user });
  }
}
