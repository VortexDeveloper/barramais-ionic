import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { HomePage } from "../home/home";
import { Registration4Page } from '../registration4/registration4';

@Component({
  selector: 'page-registration-3',
  templateUrl: 'registration-3.html'
})
export class Registration3Page {

  user: UserModel = new UserModel();
  avatar: string;
  rootPage = HomePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User
  ) {
    this.user = navParams.data.user ? navParams.data.user : this.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration3Page');
  }

  save(user) {
    this.userProvider.create(user)
    .subscribe(user_params => {
      this.user = new UserModel(user_params);
      this.move_to_photopage(this.user);
    }, error => {
        alert(error.json());
        console.log(JSON.stringify(error.json()));
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  move_to_photopage(user: UserModel) {
    this.navCtrl.push(Registration4Page, { user: user });
  }

}
