import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { CommentModalPage } from "../comment-modal/comment-modal";
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { Posts } from '../../providers/posts';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})
export class FeedsPage {
  feeds: any = FeedsPage;
  posts: Array<any>;

  user_token: any = localStorage.getItem('user');
  user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public postsProvider: Posts
  ) {
    this.loadPosts();
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    console.log(this.user);
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

  loadPosts() {
    this.postsProvider.index().subscribe(
      (posts) => {
        this.posts = posts;
        console.log(posts);
      },
      (error) => console.log(error)
    );
  }

  like(post) {
    this.postsProvider.like(post).subscribe(
      (updated_post) => post.likes = updated_post.likes,
      (error) => console.log(error)
    );
  }

  like_color_for(post) {
    if(post.likes.didILiked)
      return 'barramais';
    else
      return 'grayed'
  }
}
