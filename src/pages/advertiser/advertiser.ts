import { Advertiser } from '../../providers/advertiser';
import { AdvertiserAdsPage } from './advertiser-ads';
import { AdvertiserModel } from "../../models/advertiser.model";
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddressModel } from "../../models/address.model";
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";


/*
  Generated class for the Advertiser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-advertiser',
  templateUrl: 'advertiser.html'
})
export class AdvertiserPage {
  host: string = "http://localhost:3000";
  advertiser: AdvertiserModel;
  address: AddressModel = new AddressModel();
  cities: any;
  states: any;
  adPage: any = AdvertiserAdsPage;
  current_user: UserModel;
  user_advertiser: any;
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  ads: any;
  isAdsEmpty: boolean = true;

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public navParams: NavParams,
    private advertiserProvider: Advertiser,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.advertiser = new AdvertiserModel(this.loadAdvertiser(this.current_user));

      if(this.ads != null){
        this.isAdsEmpty = false;
      }

      /*if(this.advertiser != null){
        this.openPage(this.adPage);
      }*/

      this.getStates('1');

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertiserPage');
  }

  save(advertiser, address){
    this.advertiserProvider.create(advertiser, address)
    .subscribe(response => {
        this.presentToast("Anunciante criado com sucesso!");
    }, error => {
        console.log(error.json());
        this.presentToast(error.json());
    });
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

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  getCountry() {
    this.advertiserProvider.getCountry()
    .subscribe(response => {
      console.log(response);
    }, error => {
        console.log(error.json());
    });
  }

  getStates(country) {
    this.advertiserProvider.getStates(country)
    .subscribe(response => {
      this.states = response.states;
    }, error => {
        console.log(error.json());
    });
  }

  getCities() {
    this.advertiserProvider.getCities(this.address.state_id)
    .subscribe(response => {
      this.cities = response.cities;
    }, error => {
        console.log(error.json());
    });
  }

  openPage(page){
    this.navCtrl.push(page);
  }

}
