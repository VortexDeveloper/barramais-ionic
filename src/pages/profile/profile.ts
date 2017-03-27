import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { UserPage } from '../user/user';
import { FeedsPage } from '../feeds/feeds';
import { GroupsPage } from '../groups/groups';
import { EventsPage } from '../events/events';
import { FriendsPage } from '../friends/friends';
import { HomePage } from '../home/home';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { Conversations } from '../../providers/conversations';
import { MessagesPage } from '../messages/messages';
import { CommentModalPage } from "../comment-modal/comment-modal";
import { Posts } from '../../providers/posts';


/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel;
  userPage: any = UserPage;
  profilePage: any = ProfilePage;
  feedsPage: any = FeedsPage;
  groupsPage: any = GroupsPage;
  eventsPage: any = EventsPage;
  friendsPage: any = FriendsPage;
  friends: any;
  friendsCount: number;
  profileInformation: boolean = false;
  visitorActions: boolean = false;
  current_user: UserModel;
  isFriend: any;
  posts: Array<any>;

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    private userProvider: User,
    public conversationProvider: Conversations,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public postsProvider: Posts
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.user = new UserModel(params.data.user);
      this.checkUser(this.user, this.current_user);
      this.loadFriends();
      this.user.id == this.current_user.id? this.isFriend = null : this.is_friend_of();
      this.loadPosts();
      console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  openFriends(){
    this.navCtrl.push(this.friendsPage, {friends: this.friends});
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

  loadFriends() {
    this.userProvider.user_friends(this.user)
    .subscribe(
      (friends) => {
        this.friends = friends;
        this.friendsCount = friends.length;
      },
      (error) => console.log(error)
    );
  }

  showProfileInformation(){
    this.profileInformation = !this.profileInformation;
  }

  checkUser(user, current_user){
    if(user.id != current_user.id){
      this.visitorActions = true;
    }
  }

  createConversationWith(user) {
    this.conversationProvider.create(user).subscribe(
      (conversation) => {
        this.navCtrl.push(MessagesPage, { conversation: conversation });
      },
      (error) => console.log(error)
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  accept_friendship(user){
    this.userProvider.accept_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response);
      },
      (error) => console.log(error)
    );
  }

  refuse_friendship(user){
    this.userProvider.refuse_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
      },
      (error) => console.log(error)
    );
  }

  request_friendship(user){
    this.userProvider.request_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
      },
      (error) => console.log(error)
    );
  }

  is_friend_of(){
    this.userProvider.is_friend_of(this.user)
    .subscribe(
      (response) => {
        this.isFriend = response;
      },
      (error) => console.log(error)
    );
  }

  loadPosts() {
    this.postsProvider.index().subscribe(
      (posts) => this.posts = posts,
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
