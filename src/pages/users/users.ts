import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { FriendshipRequestPage } from '../friendship-request/friendship-request'
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers/user';

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  userList: Array<any>;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    params: NavParams,
    public userProvider: User
  ) {
    this.user_list();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  user_list(){
    this.userProvider.user_list()
    .subscribe(
      (users) => {
        this.userList = users;
        console.log(users);
      }, (error) => {
        console.log(error.json());
      }
    );
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  openProfile(user) {
    this.navCtrl.push(this.profilePage, {user: user})
  }

  unfriend(user){
    this.userProvider.unfriend(user)
    .subscribe(
      (response) =>{
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

  request_friendship(user){
    this.userProvider.request_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
      },
      (error) => console.log(error)
    );
  }

  // is_friend_of(user){
  //   this.userProvider.is_friend_of(user)
  //   .subscribe(
  //     (response) => {
  //       this.isFriend = response;
  //     },
  //     (error) => console.log(error)
  //   );
  // }

}
