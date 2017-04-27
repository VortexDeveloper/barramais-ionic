import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { ProfilePage } from "../profile/profile";
import { Posts } from '../../providers/posts';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../providers/user';
import { InterestSelectionPage } from '../interest-selection/interest-selection';

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
  userInterests: any[] = [];
  interestSelectionPage: any = InterestSelectionPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public postsProvider: Posts,
    public userProvider: User,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad() {
    this.loadPosts();
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.load_interests(this.user);
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

  openRoot(page){
    this.navCtrl.setRoot(page);
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

  load_interests(user){
    this.userProvider.load_interests(user.id)
      .subscribe(response => {
        this.userInterests = response;
        if(this.userInterests.length < 3){
          this.openRoot(this.interestSelectionPage);
        }
      }, error => {
        console.log(error.json());
      })
  }

  doRefresh(refresher) {
    this.loadPosts();
    refresher.complete();
  }

}
