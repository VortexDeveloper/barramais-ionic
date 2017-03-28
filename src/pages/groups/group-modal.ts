import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Groups } from "../../providers/groups";
import { GroupModel } from "../../models/group.model";
import { ToastController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { Camera } from 'ionic-native';
import { GroupsPage } from "../groups/groups";

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
  user: UserModel;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public groupProvider: Groups,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  create(group){
    group.user_id = this.user.id;
    this.groupProvider.create(group)
    .subscribe(group_params => {
        this.group = new GroupModel(group_params);
        this.viewCtrl.dismiss(this.group);
        this.presentToast('Grupo criado com sucesso!');
    }, error => {
        console.log(error.json());
        this.presentToast(error);
    });
  }

  presentToast(msg) {
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
      this.group.cover_photo = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.group.cover_photo;
  }

  is_from_gallery(sourceType) {
    sourceType === Camera.PictureSourceType.PHOTOLIBRARY
  }

  is_android() {
    this.platform.is('android')
  }

}
