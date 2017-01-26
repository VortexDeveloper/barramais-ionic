import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Registration1Page } from '../registration-1/registration-1';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { FeedsPage }from '../feeds/feeds';

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
  login: any;
  feeds: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    private userProvider: User
  ) {
    this.menu.enable(false, 'menu');

    this.registration = Registration1Page;
    this.feeds = FeedsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  openPage(page) {
    this.navCtrl.setRoot(page);
    
  }

}
