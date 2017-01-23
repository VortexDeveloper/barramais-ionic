import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserPage } from '../user/user';
import { User } from '../../providers/user';
import { EventsPage } from '../events/events';
import { GroupsPage } from '../groups/groups';

/*
  Generated class for the Feeds page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
  providers: [User]
})
export class FeedsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedsPage');
  }

  openPage(user) {
    this.navCtrl.push(UserPage, { user: user });
  }

}
