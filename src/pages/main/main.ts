import { Component } from '@angular/core';
import { NavController, NavParams, MenuController} from 'ionic-angular';
import { UserPage } from '../user/user';
import { GroupsPage } from '../groups/groups';
import { FeedsPage } from '../feeds/feeds';
import { ProfilePage } from '../profile/profile';
import { ConversationPage } from '../../pages/conversation/conversation';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  user: any = UserPage;
  feeds: any = FeedsPage;
  groups: any = GroupsPage;
  profile: any = ProfilePage;
  conversation: any = ConversationPage;

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
  ) {
      this.menu.enable(true, 'menu');
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  openProfile(){
    this.navCtrl.setRoot(this.profile, {user: this.current_user})
  }

}
