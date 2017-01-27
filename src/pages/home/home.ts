import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Registration1Page } from '../registration-1/registration-1';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { FeedsPage }from '../feeds/feeds';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  user: UserModel = new UserModel();
  registration: any;
  feeds: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {
    this.menu.enable(false, 'menu');
    this.registration = Registration1Page;
    this.feeds = FeedsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openPage(page) {
    this.navCtrl.setRoot(page, {}, {animate: true, direction: 'forward'});
  }

  login(user) {
    this.userProvider.login(user)
    .subscribe(user_params => {
        console.log(user_params);
        var current_user = JSON.stringify(user_params);
        localStorage.setItem("current_user", current_user);
        this.openPage(this.feeds);
        this.presentToast("Logado com sucesso.");
    }, error => {
        console.log(error.json());
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
