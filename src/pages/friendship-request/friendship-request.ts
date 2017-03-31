import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { FriendsPage } from '../friends/friends'
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers/user';
/*
  Generated class for the FriendshipRequest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friendship-request',
  templateUrl: 'friendship-request.html'
})
export class FriendshipRequestPage {

  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  friendsPage: any = FriendsPage;
  friendshipRequestPage: any = FriendshipRequestPage;
  pendingFriendships: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public userProvider: User
  ) {
      this.pending_friendships();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendshipRequestPage');
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  pending_friendships(){
    this.userProvider.pending_friendships()
    .subscribe(
      (response) => {
        this.pendingFriendships = response.pending_friendships;
        console.log(response.pending_friendships);
      },
      (error) => {
        console.log(error.json());
      }
    );
  }

  accept_friendship(user){
    this.userProvider.accept_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
        this.pendingFriendships.splice(this.pendingFriendships.indexOf(user), 1)
      },
      (error) => console.log(error)
    );
  }

  refuse_friendship(user){
    this.userProvider.refuse_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
        this.pendingFriendships.splice(this.pendingFriendships.indexOf(user), 1)
      },
      (error) => console.log(error)
    );
  }

  openProfile(user) {
    this.navCtrl.push(this.profilePage, {user: user.id})
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
