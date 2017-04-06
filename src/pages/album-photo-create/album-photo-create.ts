import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { User } from '../../providers/user';
import { AlbumPhotoModel } from "../../models/album_photo.model";
import { Camera } from 'ionic-native';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the AlbumPhotoCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-album-photo-create',
  templateUrl: 'album-photo-create.html'
})
export class AlbumPhotoCreatePage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  albumPhoto: AlbumPhotoModel;
  isEditing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.albumPhoto = navParams.data.albumPhoto
        ? new AlbumPhotoModel(navParams.data.albumPhoto) : new AlbumPhotoModel();
      this.bondPhotoWithUserAlbum();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPhotoCreatePage');
  }

  save(albumPhoto){
    this.userProvider.create_album_photo(albumPhoto)
      .subscribe(response => {
    }, error => {
        console.log(error.json());
        this.presentToast(error.json());
    });
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
      this.albumPhoto.photo = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.albumPhoto.photo;
  }

  bondPhotoWithUserAlbum(){
    if(this.albumPhoto.user_id == 0){
      this.albumPhoto.user_id = this.current_user.id;
    }else{
      this.isEditing = true;
    }
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
