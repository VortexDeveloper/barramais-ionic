import { Advertiser } from '../../providers/advertiser';
import { AdvertiserModel } from "../../models/advertiser.model";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AdvertiserAds page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advertiser-ads',
  templateUrl: 'advertiser-ads.html'
})
export class AdvertiserAdsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private advertiserProvider: Advertiser
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertiserAdsPage');
  }

}
