import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { EventModalPage } from "../event-modal/event-modal";
import { EventProvider } from '../../providers/events';
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
  events: any = "my-events";
  eventsIndex: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public eventProvider: EventProvider)
    {
      this.index();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  index(){
    this.eventProvider.index()
    .subscribe(response =>{
        console.log(response.events);
        this.eventsIndex = response.events;
    }, error =>{
      console.log("Erro ao exibir Eventos");
    });
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  openModal() {
    let modal = this.modalCtrl.create(EventModalPage);
    modal.present();
  }

}
