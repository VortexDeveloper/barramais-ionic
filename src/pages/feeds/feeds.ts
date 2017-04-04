import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { CommentModalPage } from "../comment-modal/comment-modal";
import { GalleryModalPage } from "../gallery-modal/gallery-modal";
import { ProfilePage } from "../profile/profile";
import { Posts } from '../../providers/posts';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html'
})
export class FeedsPage {

  public comment: any;
  galleryModal: any = GalleryModalPage;
  feeds: any = FeedsPage;
  posts: Array<any>;
  profilePage: any = ProfilePage;
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
    this.comment = {}
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
    this.navCtrl.push(this.galleryModal, {photos: photos})
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

  createComment(post, comment) {
    this.postsProvider.comment(post, comment).subscribe(
      (comment) => {
        post.new_comment_body = "";
        post.comments.push(comment);
      },
      (error) => console.log(error)
    );
  }


}
