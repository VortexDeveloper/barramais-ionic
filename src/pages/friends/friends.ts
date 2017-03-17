import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { FriendshipRequestPage } from '../friendship-request/friendship-request'
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { Conversations } from '../../providers/conversations';
import { MessagesPage } from '../messages/messages';
import { User } from '../../providers/user';

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
  friends: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conversationProvider: Conversations,
    public userProvider: User
  ) {
    this.loadFriends();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  createConversationWith(user) {
    this.conversationProvider.create(user).subscribe(
      (conversation) => {
        this.navCtrl.push(MessagesPage, { conversation: conversation });
      },
      (error) => console.log(error)
    );
  }

  loadFriends() {
    this.userProvider.user_friends().subscribe(
      (friends) => {
        this.friends = friends;
        console.log(friends);
      },
      (error) => console.log(error)
    );
  }
}
