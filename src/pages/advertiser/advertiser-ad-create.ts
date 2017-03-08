import { Advertiser } from '../../providers/advertiser';
import { AdModel } from "../../models/ad.model";
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';

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
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private advertiserProvider: Advertiser,
    public toastCtrl: ToastController,
    public actionsheetCtrl: ActionSheetController
  ) {
      this.ad = new AdModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertiserAdCreatePage');
  }

  // save(ad){
  //   this.advertiserProvider.createAd(ad)
  //   .subscribe(response => {
  //       this.presentToast("Anúncio criado com sucesso!")
  //   }, error => {
  //       console.log(error.json());
  //       this.presentToast(error.json());
  //   });
  // }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  public presentActionSheet() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Selecione a origem da imagem',
      buttons: [
        {
          text: 'Carregar da Galeria',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit: true,
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 360,
		  targetHeight: 232
    };

    Camera.getPicture(options).then(image => {
      this.ad.photo = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.ad.photo;
  }

  is_from_gallery(sourceType) {
    sourceType === Camera.PictureSourceType.PHOTOLIBRARY
  }

  is_android() {
    this.platform.is('android')
  }

}
