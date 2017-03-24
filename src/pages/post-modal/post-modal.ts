import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Posts } from '../../providers/posts';

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
  public post: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionsheetCtrl: ActionSheetController,
    public postsProvider: Posts
  ) {
    this.post = {};
  }

  dismiss() {
    this.viewCtrl.dismiss(this.post);
  }

  openMediaOptions() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Carregar midia',
      cssClass: 'page-post-modal',
      buttons: [
        {
          text: 'Video',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Imagem',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            console.log('Favorite clicked');
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
        this.dismiss();
      },
      (error) => console.log(error)
    );
  }
}
