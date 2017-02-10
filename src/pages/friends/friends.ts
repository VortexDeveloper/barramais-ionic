import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { FriendshipRequestPage } from '../friendship-request/friendship-request'
import { BmHeaderComponent } from '../components/bm-header/bm-header';

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

  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  friendsPage: any = FriendsPage;
  friendshipRequestPage: any = FriendshipRequestPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  openPage(page){
    this.navCtrl.push(page);
  }

}
