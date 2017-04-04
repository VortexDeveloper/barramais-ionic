import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Posts } from '../../providers/posts';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

/*
  Generated class for the PostModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-modal',
  templateUrl: 'post-modal.html'
})
export class PostModalPage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  erro: string = "";

  public post: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionsheetCtrl: ActionSheetController,
    public postsProvider: Posts,
    private camera: Camera
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.post = {medias: []};
  }

  dismiss(new_post = null) {
    this.viewCtrl.dismiss(new_post);
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

  createPost() {
    this.postsProvider.create(this.post).subscribe(
      (post) => {
        this.post = post;
        this.dismiss(this.post);
      },
      (error) => console.log(error)
    );
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
          let d = new Date;
          let new_name = d.getTime();
          let new_media = {image: 'data:image/jpeg;base64,' + image, filename: new_name};
          this.post.medias.push(new_media);
        };

        includeToNewMedia(image_url);
      },
      error => {
        this.erro = error;
      }
    );
  }

  // getVideo(sourceType) {
  //   this.mediaCapture.captureVideo();
  // }


}
