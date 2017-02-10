import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { BmHeaderComponent } from '../components/bm-header/bm-header';


@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})
export class FeedsPage {

  feeds: any = FeedsPage;

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

  openPage(page){
    this.navCtrl.push(page);
  }

}
