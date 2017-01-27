import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams}  from 'ionic-angular';
import { ViewController,Platform, LoadingController }  from 'ionic-angular';
import { Loading } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { User } from '../../providers/user';
import { Camera, File, FilePath } from 'ionic-native';
import { FeedsPage } from '../feeds/feeds';

declare var cordova: any;

/*
  Generated class for the Registration4 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration4',
  templateUrl: 'registration4.html'
})
export class Registration4Page {

  user: UserModel = new UserModel();
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl: LoadingController
  ) {
    this.user = navParams.data.user ? navParams.data.user : this.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration4Page');
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
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
      destinationType: Camera.DestinationType.DATA_URL
    };

    Camera.getPicture(options).then(image => {
      this.user.avatar = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.user.avatar;
  }

  is_from_gallery(sourceType) {
    sourceType === Camera.PictureSourceType.PHOTOLIBRARY
  }

  is_android() {
    this.platform.is('android')
  }

  save_avatar(user) {
    this.userProvider.save_avatar(user)
    .subscribe(user_params => {
      this.navCtrl.setRoot(FeedsPage, {}, {animate: true, direction: 'forward'});
    }, error => {
        alert(error.json());
        console.log(JSON.stringify(error.json()));
    });
  }
}
