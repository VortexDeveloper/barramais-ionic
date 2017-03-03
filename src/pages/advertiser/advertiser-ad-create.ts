import { Advertiser } from '../../providers/advertiser';
import { AdModel } from "../../models/ad.model";
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AdvertiserAdCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advertiser-ad-create',
  templateUrl: 'advertiser-ad-create.html'
})
export class AdvertiserAdCreatePage {
  ad: AdModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private advertiserProvider: Advertiser,
    public toastCtrl: ToastController
  ) {
      this.ad = new AdModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertiserAdCreatePage');
  }

  save(ad){
    this.advertiserProvider.createAd(ad)
    .subscribe(response => {
        this.presentToast("Anúncio criado com sucesso!")
    }, error => {
        console.log(error.json());
        this.presentToast(error.json());
    });
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
