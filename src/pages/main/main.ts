import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { GroupsPage } from '../groups/groups';
import { EventsPage } from '../events/events';
import { FeedsPage } from '../feeds/feeds';

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

  user = UserPage;
  feeds: any;
  events: any;
  groups: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
  ) {
      this.menu.enable(true, 'menu');
      this.events = EventsPage;
      this.groups = GroupsPage;
      this.feeds = FeedsPage;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }


}
