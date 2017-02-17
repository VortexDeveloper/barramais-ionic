import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { UserPage } from '../user/user';
import { FeedsPage } from '../feeds/feeds';
import { GroupsPage } from '../groups/groups'; 
import { EventsPage } from '../events/events';
import { EventGuestsPage } from "../events/event-guests";
import { FriendsPage } from '../friends/friends';
import { HomePage } from '../home/home';
import { UserModel } from "../../models/user.model";
import { EventModel } from "../../models/event.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';
import { BmHeaderComponent } from '../components/bm-header/bm-header';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-event-page',
  templateUrl: 'event-page.html'
})
export class EventPagePage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel;
  userPage: any = UserPage;
  feedsPage: any = FeedsPage;
  groupsPage: any = GroupsPage;
  eventsPage: any = EventsPage;
  friendsPage: any = FriendsPage;
  event: EventModel = new EventModel();
  postModal: any = PostModalPage;
  eventGuests: any = EventGuestsPage;

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    private userProvider: User,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
      this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.event = params.data.event ? params.data.event : this.event;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  openModal(page) {
    let modal = this.modalCtrl.create(page, {event: this.event});
    modal.present();
  }

}
