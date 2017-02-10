import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { BmHeaderComponent } from '../components/bm-header/bm-header';

/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  events: string = "my-events";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  openPage(page){
    this.navCtrl.push(page);
  }

}
