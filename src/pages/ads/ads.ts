import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { AdvertiserModel } from "../../models/advertiser.model";
import { User } from '../../providers/user';
import { AdModel } from "../../models/ad.model";
import { Advertiser } from '../../providers/advertiser';
import { ToastController } from 'ionic-angular';
import { AdvertiserPage } from '../advertiser/advertiser';

/*
  Generated class for the Ads page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {
  ad: AdModel;
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');
  advertiser: AdvertiserModel;
  ads: any;
  advertiserPage: AdvertiserPage;

  constructor(
    public navCtrl: NavController,
    private userProvider: User,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private advertiserProvider: Advertiser
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.advertiser = new AdvertiserModel(this.loadAdvertiser(this.current_user));
    this.ad = new AdModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdsPage');
  }

  loadAdvertiser(current_user){
    this.userAdvertiser(current_user);
  }

  userAdvertiser(current_user){
    this.userProvider.userAdvertiser(current_user)
      .subscribe(response =>{
        console.log(response.user_advertiser);
        this.advertiser = new AdvertiserModel(response.user_advertiser);
        this.ads = response.user_advertiser.ads;
      }, error => {
          console.log("Erro ao exibir o cadastro de anunciante" + error.json());
      });
  }

  save(ad){
    this.advertiserProvider.createAd(ad, this.advertiser)
    .subscribe(response => {
        this.openPage(AdvertiserPage);
        this.presentToast("Anúncio cadastrado!");
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

  openPage(page){
    this.navCtrl.push(page);
  }

}
