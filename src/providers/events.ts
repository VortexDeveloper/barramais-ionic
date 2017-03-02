import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the Events provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {

  //private host: string = "https://barramais.herokuapp.com/"
  //private host: string = "http://10.0.2.2:3000/"
  private host: string = "http://localhost:3000/"


  private url: string = this.host + "events";
  private country_url: string = this.host + "events/country_for_select";
  private states_url: string = this.host + "events/states_for_select/";
  private cities_url: string = this.host + "events/cities_for_select/";
  private invitation_url: string = this.host + "events/invitation/";
  private all_guests_url: string = this.host + "events/all_guests/";
  private confirmed_guests_url: string = this.host + "events/confirmed_guests/";
  private pending_guests_url: string = this.host + "events/pending_guests/";
  private refused_guests_url: string = this.host + "events/refused_guests/";

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {

  }

  create(event, address){
    let d = new Date;
    let new_name = event.id + d.getTime();
    return this.authHttp.post(this.url + ".json", {'event': event, 'address': address, 'cover_photo': {'image': event.cover_photo, 'filename': new_name}})
      .map(res => res.json());
  }

  getCountry(){
    return this.authHttp.get(this.country_url + ".json")
      .map(res => res.json());
  }

  getStates(country){
    return this.authHttp.get(this.states_url + country + ".json")
      .map(res => res.json());
  }

  getCities(state){
    return this.authHttp.get(this.cities_url + state + ".json")
      .map(res => res.json());
  }

  invitation(event, user_id){
    return this.authHttp.put(this.invitation_url + event.id + ".json", {'user': user_id})
      .map(res => res.json());
  }

  all_guests(event){
    return this.authHttp.get(this.all_guests_url + event.id + ".json")
      .map(res => res.json());
  }

  confirmed_guests(event){
    return this.authHttp.get(this.confirmed_guests_url + event.id + ".json")
      .map(res => res.json());
  }

  pending_guests(event){
    return this.authHttp.get(this.pending_guests_url + event.id + ".json")
      .map(res => res.json());
  }

  refused_guests(event){
    return this.authHttp.get(this.refused_guests_url + event.id + ".json")
      .map(res => res.json());
  }



}
