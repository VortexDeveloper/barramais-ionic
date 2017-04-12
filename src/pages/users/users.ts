import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { ToastController } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { Conversations } from '../../providers/conversations';
import { MessagesPage } from '../messages/messages';
import { AlertController } from 'ionic-angular';

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
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    params: NavParams,
    public conversationProvider: Conversations,
    public userProvider: User
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
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
      }, (error) => {
        console.log(error.json());
      }
    );
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
        this.presentToast(response.status);
        this.userList[(this.userList.indexOf(user))].isFriend = false;
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
        this.userList[(this.userList.indexOf(user))].isFriend = 'waiting';
      },
      (error) => console.log(error)
    );
  }

  createConversationWith(user) {
    this.conversationProvider.create(user).subscribe(
      (conversation) => {
        this.navCtrl.push(MessagesPage, { conversation: conversation });
      },
      (error) => console.log(error)
    );
  }

  isWaiting(user_name) {
    let alert = this.alertCtrl.create({
      title: 'Aguardando',
      message: 'Você já convidou ' + user_name + ', aguarde a aceitação de eu convite.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        }
      ]
    });
    alert.present();
  }

}
