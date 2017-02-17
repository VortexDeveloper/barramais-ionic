import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { EventProvider } from "../../providers/events";
import { User } from "../../providers/user";
import { EventModel } from "../../models/event.model";
import { AddressModel } from "../../models/address.model";
import { ToastController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { Camera } from 'ionic-native';
import { EventsPage } from "../events/events";

/*
  Generated class for the PostModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-guests',
  templateUrl: 'event-guests.html'
})
export class EventGuestsPage {

  event: EventModel = new EventModel();
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  friends: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public eventProvider: EventProvider,
    public userProvider: User,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.event = params.data.event ? params.data.event : this.event;
      this.userFriends();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  userFriends(){
    this.userProvider.userFriends()
    .subscribe(response => {
      console.log(response.users);
      this.friends = response.users;
    }, error => {
      console.log(error.json());
    });
  }

  invitation(user){
    this.eventProvider.invitation(this.event, user.id)
    .subscribe(response => {
        console.log(response.event_users);
    }, error => {
        console.log(error.json());
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
