import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { EventModalPage } from "../events/event-modal";
import { EventProvider } from '../../providers/events';
import { User } from '../../providers/user';
import { EventPagePage } from '../events/event-page';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

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
  // host: string = "https://barramais.herokuapp.com";
  host: string = "http://localhost:3000";
  
  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  events: any = "my-events";
  eventPage: any = EventPagePage;
  my_events: any;
  confirmed_events: any;
  pending_events: any;
  current_user: UserModel;
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any = localStorage.getItem('user');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public eventProvider: EventProvider,
    public userProvider: User,
    public loadingCtrl: LoadingController)
    {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.loadEvents(this.current_user);
      this.presentLoading();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando Eventos...",
      duration: 2000
    });
    loader.present();
  }

  loadEvents(current_user){
    this.myEvents(current_user);
    this.confirmedEvents(current_user);
    this.pendingEvents(current_user);
  }

  myEvents(current_user){
    this.userProvider.myEvents(current_user)
      .subscribe(response =>{
        console.log(response.my_events);
        this.my_events = response.my_events;
      }, error =>{
        console.log("Erro ao exibir meus eventos: " + error.json());
      });
  }

  pendingEvents(current_user){
    this.userProvider.pendingEvents(current_user)
      .subscribe(response =>{
        console.log(response.my_pending_invitations);
        this.pending_events = response.my_pending_invitations;
      }, error =>{
        console.log("Erro ao exibir eventos confirmados: " + error.json());
      });
  }

  confirmedEvents(current_user){
    this.userProvider.confirmedEvents(current_user)
      .subscribe(response =>{
        console.log(response.my_confirmed_invitations);
        this.confirmed_events = response.my_confirmed_invitations;
      }, error =>{
        console.log("Erro ao exibir eventos confirmados: " + error.json());
      });
  }

  openPage(event){
    this.navCtrl.push(EventPagePage, {event: event});
  }

  openModal() {
    let modal = this.modalCtrl.create(EventModalPage, { my_events: this.my_events });
    modal.onDidDismiss(event => {
      if(event){
        this.my_events.push(event);
        this.confirmed_events.push(event);
      }
    });
    modal.present();
  }

  doRefresh(refresher) {
    this.myEvents(this.current_user);
    refresher.complete();
  }

}
