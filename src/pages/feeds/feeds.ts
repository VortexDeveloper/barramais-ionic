import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { ProfilePage } from "../profile/profile";
import { CocoButtonComponent } from '../components/coco-button/coco-button';


@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})
export class FeedsPage {

  profilePage: any = ProfilePage;
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
