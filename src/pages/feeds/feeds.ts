import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { User } from '../../providers/user';
import { Registration1Page } from '../registration-1/registration-1';
import { Registration3Page } from '../registration-3/registration-3';
import { HomePage } from '../home/home';

import { PostModalPage } from "../post-modal/post-modal";



@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})
export class FeedsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
  }

  destroySession(){
    localStorage.removeItem("current_user");
    this.openPage(HomePage);
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  openModal() {
    let modal = this.modalCtrl.create(PostModalPage);
    modal.present();
  }

}
