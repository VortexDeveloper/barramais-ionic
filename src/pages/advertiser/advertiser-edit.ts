import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { AdvertiserModel } from "../../models/advertiser.model";
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';



/*
  Generated class for the AdvertiserAdEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advertiser-edit',
  templateUrl: 'advertiser-edit.html'
})
export class AdvertiserEditPage {
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');
  advertiser: AdvertiserModel;
  ads: any;
  isAdvertiser: boolean = false;
  isAdsEmpty: boolean = true;

  constructor(
    public navCtrl: NavController,
    private userProvider: User,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.advertiser = new AdvertiserModel(this.loadAdvertiser(this.current_user));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertiserAdEditPage');
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
          this.presentToast("Você ainda não é um anunciante, efetue seu cadastro.");
        }
        this.checkAdsList();
      }, error => {
          console.log("Erro ao exibir o cadastro de anunciante" + error.json());
      });
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  checkAdsList(){
    if(this.ads.length < 1){
      this.isAdsEmpty = false;
    }
  }

}
