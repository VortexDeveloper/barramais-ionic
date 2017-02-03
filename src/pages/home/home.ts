import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';

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

  registration: any = RegistrationPage;
  login: any = LoginPage;
  mainPage: any = MainPage;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public modalCtrl: ModalController
  ) {
    this.menu.enable(false, 'menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openPage(page) {
    this.navCtrl.setRoot(page, {}, {animate: true, direction: 'forward'});
  }

  openModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

}
