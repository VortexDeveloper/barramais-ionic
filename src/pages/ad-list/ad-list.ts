import { Advertiser } from '../../providers/advertiser';
import { AdvertiserModel } from "../../models/advertiser.model";
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddressModel } from "../../models/address.model";
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AdsPage } from '../ads/ads';
import { AdBannersPage } from '../ad-banners/ad-banners';
import { AdInterestsPage } from '../ad-interests/ad-interests';
import { AdDescriptionsPage } from '../ad-descriptions/ad-descriptions';
import { AdPreviewPage } from '../ad-preview/ad-preview';

/*
  Generated class for the AdList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ad-list',
  templateUrl: 'ad-list.html'
})
export class AdListPage {
  host: string = "http://localhost:3000";
  advertiser: AdvertiserModel;
  address: AddressModel = new AddressModel();
  cities: any;
  states: any;
  current_user: UserModel;
  user_advertiser: any;
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  ads: any;
  isAdsEmpty: boolean = true;
  isAdvertiser: boolean = false;
  adsPage: any = AdsPage;
  adBannersPage: any = AdBannersPage;
  adInterestsPage: any = AdInterestsPage;
  adDescriptionsPage: any = AdDescriptionsPage;
  adPreviewPage: any = AdPreviewPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    params: NavParams,
    private advertiserProvider: Advertiser,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.advertiser = new AdvertiserModel(this.loadAdvertiser(this.current_user));

    if(this.advertiser != null){
      this.isAdvertiser = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdListPage');
  }

  loadAdvertiser(current_user){
    this.userAdvertiser(current_user);
  }

  userAdvertiser(current_user){
    this.userProvider.userAdvertiser(current_user)
      .subscribe(response =>{
        if(response.user_advertiser){
          this.advertiser = new AdvertiserModel(response.user_advertiser);
          this.ads = response.user_advertiser.ads;
        }else{
          this.advertiser = new AdvertiserModel();
          this.ads = [];
          this.isAdvertiser = false;
        }
        this.checkAdsList();
      }, error => {
          console.log("Erro ao exibir o cadastro de anunciante" + error.json());
      });
  }

  checkAdsList(){
    if(this.ads.length < 1){
      this.isAdsEmpty = false;
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  destroy(ad){
    this.advertiserProvider.destroy(ad)
    .subscribe(response => {
      this.presentToast("Anúncio removido com sucesso!");
    });
    this.clearRemovedAd(ad);
    this.checkAdsList();
  }

  clearRemovedAd(removedItem){
      this.ads.splice(this.ads.indexOf(removedItem), 1);
  }

  openEditPage(page, ad){
    this.navCtrl.push(page, {'ad': ad});
  }

}