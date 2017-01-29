import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { GroupsPage } from '../groups/groups';
import { EventsPage } from '../events/events';
import { FeedsPage } from '../feeds/feeds';
import { ProfilePage } from '../profile/profile';

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
  events: any = EventsPage;
  groups: any = GroupsPage;
  profilePage: any = ProfilePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
  ) {
      this.menu.enable(true, 'menu');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }


}
