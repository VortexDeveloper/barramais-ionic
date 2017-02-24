import { Advertiser } from '../../providers/advertiser';
import { AdvertiserModel } from "../../models/advertiser.model";
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  advertiser: AdvertiserModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private advertiserProvider: Advertiser,
    public toastCtrl: ToastController
  ) {
      this.advertiser = new AdvertiserModel();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertiserPage');
  }

  save(advertiser){
    this.advertiserProvider.create(advertiser)
    .subscribe(response => {
        localStorage.setItem("advertiser", response.advertiser);
        this.presentToast("Anunciante criado com sucesso!");
    }, error => {
        console.log(error.json().errors);
        var errors = error.json().errors;
        var errorMessage;
        for(let campo in errors){
          for(let campos of errors[campo]){
            errorMessage += "Erro no campo " + campo + ": " + campos + " \n";
          }
        }
        this.presentToast(errorMessage);
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
