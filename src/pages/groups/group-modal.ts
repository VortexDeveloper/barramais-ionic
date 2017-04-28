import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Groups } from "../../providers/groups";
import { GroupModel } from "../../models/group.model";
import { ToastController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { Camera } from '@ionic-native/camera';


declare var cordova: any;

/*
  Generated class for the PostModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group-modal',
  templateUrl: 'group-modal.html'
})
export class GroupModalPage {

  group: GroupModel = new GroupModel();
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  erro: string = "";
  user: UserModel;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private camera: Camera,
    public groupProvider: Groups,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.group = new GroupModel(navParams.data.group);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  create(group){
    if(group.name == null || group.name == ""){
      this.presentToast("Preencha o nome do grupo!")
    }else{
      this.groupProvider.create(group)
      .subscribe(group_params => {
          this.group = new GroupModel(group_params);
          this.viewCtrl.dismiss(group_params);
          this.presentToast('Grupo criado com sucesso!');
      }, error => {
          console.log(error.json());
          this.presentToast(error);
      });
    }
  }

  update(group){
    if(group.name == null || group.name == ""){
      this.presentToast("Preencha o nome do grupo!")
    }else{
      this.groupProvider.update(group)
      .subscribe(group_params => {
          this.group = new GroupModel(group_params);
          this.viewCtrl.dismiss(group_params);
          this.presentToast('Grupo atualizado com sucesso!');
      }, error => {
          console.log(error.json());
          this.presentToast(error);
      });
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  openMediaOptions() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Carregar midia',
      cssClass: 'page-post-modal',
      buttons: [
        {
          text: 'Carregar da Galeria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Fotos',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            console.log('Play clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      allowEdit: true
    };

    this.camera.getPicture(options).then(
      image_url => {
        let includeToNewMedia = (image) => {
          this.group.cover_photo = 'data:image/jpeg;base64,' + image;
          this.save_cover_photo();
        };

        includeToNewMedia(image_url);
      },
      error => {
        this.erro = error;
      }
    );
  }

  save_cover_photo() {
    this.groupProvider.save_cover_photo(this.group)
    .subscribe((group_params) => {
        this.group = new GroupModel(group_params);
    }, error => {
        alert(error.json());
        console.log(JSON.stringify(error.json()));
    });
  }
}
