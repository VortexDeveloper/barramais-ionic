import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { FriendshipRequestPage } from '../friendship-request/friendship-request'
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user: UserModel = new UserModel();
  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  friendsPage: any = FriendsPage;
  friendshipRequestPage: any = FriendshipRequestPage;
  friends: Array<any>;
  friendsCount: number = 0;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    params: NavParams,
    public userProvider: User
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.user = new UserModel(params.data.user);
    this.loadFriends();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  openProfile(user) {
    this.navCtrl.push(this.profilePage, {user: user.id})
  }

  unfriend(user){
    this.userProvider.unfriend(user)
    .subscribe(
      (response) =>{
        this.friends.splice(this.friends.indexOf(user), 1);
        this.presentToast(response.status);
      },
      (error) => {
        console.log(error.json());
      }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
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

}
