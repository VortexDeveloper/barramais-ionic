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
import { InterestAreaModel } from "../../models/interest_area.model";
import { Ads } from '../../providers/ads';
import { AreaModel } from "../../models/area.model";

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
  interestList: any;
  selectedAreas: any[] = []
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    private userProvider: User,
    public navParams: NavParams,
    params: NavParams,
    public toastCtrl: ToastController,
    private advertiserProvider: Advertiser,
    private adsProvider: Ads
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.advertiser = new AdvertiserModel(this.loadAdvertiser(this.current_user));
    this.ad = params.data.ad ? new AdModel(params.data.ad) : new AdModel();
    //console.log(this.adArea(this.ad));
    this.isEditing = this.ad.id ? true : false;

    this.load_interest_list();
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

  adArea(ad){
    this.adsProvider.adArea(ad)
      .subscribe(response =>{
        this.ad.area = response.ad_area.id;
      }, error => {
        console.log("Erro" + error.json())
      });
  }

  save(ad){
    ad.interest_areas = this.selectedAreas;

    if(ad.area == null){
      this.presentToast("O modelo do anúncio precisa ser escolhido!")
    }else if(ad.interest_areas == null || ad.interest_areas.length < 1){
      this.presentToast("O anúncio deve conter ao menos uma área de interesse!")
    }else if(ad.description == ""){
      this.presentToast("O campo de descrição do anúncio precisa ser preenchido!")
    }else{
      this.advertiserProvider.createAd(ad, this.advertiser)
      .subscribe(response => {
          this.openPage(AdvertiserPage);
          this.presentToast("Anúncio cadastrado com sucesso!");
      }, error => {
          console.log(error.json());
          this.presentToast(error.json());
      });
    }
  }

  update(ad){
    ad.interest_areas = this.selectedAreas;

    if(ad.area == null){
      this.presentToast("O modelo do anúncio precisa ser escolhido!")
    }else if(ad.interest_areas == null || ad.interest_areas.length < 1){
      this.presentToast("O anúncio deve conter ao menos uma área de interesse!")
    }else if(ad.description == ""){
      this.presentToast("O campo de descrição do anúncio precisa ser preenchido!")
    }else{
      this.advertiserProvider.updateAd(ad, this.advertiser)
        .subscribe(response => {
          this.openPage(AdvertiserPage);
          this.presentToast("Anúncio modificado com sucesso!");
        }, error => {
          console.log(error.json());
          this.presentToast(error.json());
        });
    }
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

  load_interest_list(){
    this.adsProvider.load_interest_list()
      .subscribe(response =>{
        this.interestList = response.interest_list;
      }, error => {
          console.log("Erro ao exibir as áreas de interesse" + error.json());
      });
  }

  getSelect(isChecked, interestArea) {
    if (isChecked) {
      this.selectedAreas.push(interestArea);
    } else {
      this.selectedAreas.splice(this.selectedAreas.indexOf(interestArea), 1);
    }
    console.log(this.selectedAreas);
  }

}
