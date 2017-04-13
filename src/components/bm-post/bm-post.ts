import { Component, Input } from '@angular/core';
import { UserModel } from "../../models/user.model";
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { PostModalPage } from "../../pages/post-modal/post-modal";
import { CommentModalPage } from "../../pages/comment-modal/comment-modal";
import { GalleryModalPage } from "../../pages/gallery-modal/gallery-modal";
import { ProfilePage } from "../../pages/profile/profile";
import { Posts } from '../../providers/posts';
import { InAppBrowser } from 'ionic-native';
import { JwtHelper } from 'angular2-jwt';
import { Events } from 'ionic-angular';

/*
  Generated class for the BmPost component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'bm-post',
  templateUrl: 'bm-post.html'
})
export class BmPostComponent {
    @Input() posts;
    public comment: any;
    galleryModal: any = GalleryModalPage;
    profilePage: any = ProfilePage;
    jwtHelper: JwtHelper = new JwtHelper();
    token: any = localStorage.getItem('jwt');
    user_token: any = localStorage.getItem('user');
    current_user: any;

    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController,
      public postsProvider: Posts,
      public alertCtrl: AlertController,
      public events: Events
    ) {
      this.comment = {}
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      events.subscribe('onUpdateUser', (user) => { this.current_user = new UserModel(user) });
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad FeedsPage');
    }

    openModal() {
      let modal = this.modalCtrl.create(PostModalPage);
      modal.onDidDismiss(newPost => {
        if(newPost) this.posts.unshift(newPost);
      });
      modal.present();
    }

    openCommentsModal(post) {
      let modal = this.modalCtrl.create(CommentModalPage, {post: post});
      modal.present();
    }

    openPage(page){
      this.navCtrl.push(page);
    }

    openProfile(user_id) {
      this.navCtrl.push(this.profilePage, {user: user_id})
    }

    openPhotos(photos){
      let modal = this.modalCtrl.create(this.galleryModal, {photos: photos});
      modal.present();
    }

    openLink(link){
      console.log(link);
      if(link){
        let browser = new InAppBrowser(link, '_system');
        browser
      }
    }


    like(post) {
      this.postsProvider.like(post).subscribe(
        (updated_post) => post.likes = updated_post.likes,
        (error) => console.log(error)
      );
    }

    deletePost(post) {
      let prompt = this.alertCtrl.create({
        title: 'Deletar postagem',
        message: 'Deseja deletar este post?',
        buttons: [
          {
            text: 'Não',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sim',
            handler: data => {
              this.postsProvider.delete(post).subscribe(
                (data) => {
                  this.posts = this.posts.filter(data => data.id < post.id || data.id > post.id);
                },
                (error) => console.log(error)
              );
            }
          }
        ]
      });
      prompt.present();
    }

    deleteComment(post, comment) {
      let prompt = this.alertCtrl.create({
        title: 'Deletar comentário',
        message: 'Deseja deletar este comentário?',
        buttons: [
          {
            text: 'Não',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sim',
            handler: data => {
              this.postsProvider.delete_comment(comment).subscribe(
                (data) => {
                  post.comments = post.comments.filter(data => data.id < comment.id || data.id > comment.id);
                },
                (error) => console.log(error)
              );
            }
          }
        ]
      });
      prompt.present();
    }

    like_color_for(post) {
      if(post.likes.didILiked)
        return 'barramais';
      else
        return 'grayed'
    }

    createComment(post, comment) {
      this.postsProvider.comment(post, comment).subscribe(
        (comment) => {
          post.new_comment_body = "";
          post.comments.push(comment);
        },
        (error) => console.log(error)
      );
    }

    show_plus_sign(i) {
      if(i==3) return "plus-sign-icon";
      return "";
    }

    bringsFourImages(post_images) {
      return post_images.filter((item, index) => { index < 4 })
    }

}
