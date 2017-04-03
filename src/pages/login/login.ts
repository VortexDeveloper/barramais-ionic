import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { ToastController } from 'ionic-angular';
import { FeedsPage }from '../feeds/feeds';
import { MainPage }from '../main/main';
import { JwtHelper } from 'angular2-jwt';
import { Events } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel = new UserModel();
  feeds: any = FeedsPage;
  main: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private userProvider: User,
    public toastCtrl: ToastController,
    public events: Events,
    public menu: MenuController
  ) {
      // Keyboard.disableScroll(true);
      this.menu.enable(false, 'menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  login(user) {
    this.userProvider.login(user)
    .subscribe(token_params => {
        localStorage.setItem("jwt", token_params.token);
        localStorage.setItem("user", token_params.user);
        localStorage.setItem('vessels_type', JSON.stringify(token_params.vessels_type));
        this.events.publish("onUpdateUser", this.jwtHelper.decodeToken(token_params.user));
        this.openPage(this.main);
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
