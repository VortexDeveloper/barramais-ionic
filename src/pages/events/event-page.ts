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
import { EventProvider } from '../../providers/events';

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
  allGuests: any;
  l_allGuests: any;
  confirmedGuests: any;
  l_confirmedGuests: any;
  pendingGuests: any;
  l_pendingGuests: any;
  refusedGuests: any;
  l_refusedGuests: any;
  showAdminActions: boolean = false;
  friends: any;

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public eventProvider: EventProvider,
    private userProvider: User,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
      this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.event = params.data.event;
      this.loadGuests(this.event);
      this.verifyEventAdmin();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  loadGuests(event){
    this.all_guests(event);
    this.confirmed_guests(event);
    this.pending_guests(event);
    this.refused_guests(event);
    this.userFriends();
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  openModal(page, guests) {
    let modal = this.modalCtrl.create(page, {event: this.event, guests: guests});
    modal.present();
  }

  verifyEventAdmin(){
    if(this.event.user_id == this.user.id){
      this.showAdminActions = true;
    }
  }

  all_guests(event){
    this.eventProvider.all_guests(event)
      .subscribe(response =>{
        this.allGuests = response.all_guests;
        this.l_allGuests = response.all_guests.length
      }, error =>{
        console.log("Erro ao exibir os convidados: " + error.json());
      });
  }

  confirmed_guests(event){
    this.eventProvider.confirmed_guests(event)
      .subscribe(response =>{
        this.confirmedGuests = response.confirmed_guests;
        this.l_confirmedGuests = response.confirmed_guests.length
      }, error =>{
        console.log("Erro ao exibir os convidados: " + error.json());
      });
  }

  pending_guests(event){
    this.eventProvider.pending_guests(event)
      .subscribe(response =>{
        this.pendingGuests = response.pending_guests;
        this.l_pendingGuests = response.pending_guests.length
      }, error =>{
        console.log("Erro ao exibir os convidados: " + error.json());
      });
  }

  refused_guests(event){
    this.eventProvider.refused_guests(event)
      .subscribe(response =>{
        this.refusedGuests = response.refused_guests;
        this.l_refusedGuests = response.refused_guests.length
      }, error =>{
        console.log("Erro ao exibir os convidados: " + error.json());
      });
  }

  userFriends(){
    this.userProvider.friends()
    .subscribe(response => {
      console.log(response.users);
      this.friends = response.users;
    }, error => {
      console.log(error.json());
    });
  }

}