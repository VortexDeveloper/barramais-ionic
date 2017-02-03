import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { ToastController } from 'ionic-angular';
import { FeedsPage }from '../feeds/feeds';
import { MainPage }from '../main/main';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: UserModel = new UserModel();
  feeds: any = FeedsPage;
  main: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openPage(page) {
    this.navCtrl.setRoot(page, {}, {animate: true, direction: 'forward'});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  login(user) {
    this.userProvider.login(user)
    .subscribe(token_params => {
        console.log(token_params);
        var token = JSON.stringify(token_params);
        localStorage.setItem("jwt", token);
        this.openPage(this.main);
        this.presentToast("Logado com sucesso.");
    }, error => {
        console.log(error.json() || 'Server error');
        this.presentToast(error.json().error);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
