import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { User } from '../../providers/user';
import { Registration1Page } from '../registration-1/registration-1';


@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
  providers: [User]
})
export class FeedsPage {

  feed = FeedsPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
  ) {
    this.menu.enable(true, 'menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  cadastrar(){
    this.navCtrl.push(Registration1Page);
  }

}
