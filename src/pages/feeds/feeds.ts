import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { ProfilePage } from "../profile/profile";
import { Posts } from '../../providers/posts';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})
export class FeedsPage {

  posts: Array<any> = [];
  profilePage: any = ProfilePage;
  user_token: any = localStorage.getItem('user');
  user: UserModel = new UserModel();
  jwtHelper: JwtHelper = new JwtHelper();
  isPostsFull: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public postsProvider: Posts,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad() {
    this.loadPosts();
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
  }

  openModal() {
    let domain = {
      domain: 'profiles',
      domain_id: this.user.id
    };

    let modal = this.modalCtrl.create(PostModalPage, {'domain_config': domain});
    modal.onDidDismiss(newPost => {
      if(newPost) this.posts.unshift(newPost);
    });
    // if(this.posts.length > 0){
    //   this.isPostsFull = true;
    // }
    modal.present();
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  loadPosts() {
    let loader = this.loadingCtrl.create({
      content: "Carregando Feed..."
    });

    loader.present();

    this.postsProvider.index().subscribe(
      (posts) => {
        this.posts = posts;
        console.log(this.posts);
        loader.dismiss();
      },
      (error) => {
        console.log(error);
        loader.dismiss();
      }
    );
    if(this.posts.length > 0){
      this.isPostsFull = true;
    }
  }

}
