import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { FriendsPage } from '../friends/friends'
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendshipRequestPage');
  }

  openPage(page){
    this.navCtrl.push(page);
  }

}
