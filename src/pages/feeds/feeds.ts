import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
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

  openModal() {
    let modal = this.modalCtrl.create(PostModalPage);
    modal.present();
  }

}
