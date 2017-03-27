import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';
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
  medias: Array<any>;

  public post: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionsheetCtrl: ActionSheetController,
    public postsProvider: Posts
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.post = {};
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
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
            console.log('Play clicked');
          }
        },
        // {
        //   text: 'Imagem',
        //   icon: !this.platform.is('ios') ? 'camera' : null,
        //   handler: () => {
        //     console.log('Image clicked');
        //   }
        // },
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
  //
  // getVideo() {
  //
  // }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit: true,
      mediaType: Camera.MediaType.ALLMEDIA,
      destinationType: Camera.DestinationType.DATA_URL
    };

    Camera.getPicture(options).then(image => {
      this.medias.push("data:image/jpeg;base64," + image);
    });
  }
}
