import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Events provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {

  // private url: string = "http://10.0.2.2:3000/events";
  // private country_url: string = "http://10.0.2.2:3000/events/country_for_select";
  // private states_url: string = "http://10.0.2.2:3000/events/states_for_select";
  // private cities_url: string = "http://10.0.2.2:3000/events/cities_for_select";
  // private invitation_url: string = "http://10.0.2.2:3000/events/invitation";

  private url: string = "https://barramais.herokuapp.com/events";
  private country_url: string = "https://barramais.herokuapp.com/events/country_for_select";
  private states_url: string = "https://barramais.herokuapp.com/events/states_for_select";
  private cities_url: string = "https://barramais.herokuapp.com/events/cities_for_select";
  private invitation_url: string = "https://barramais.herokuapp.com/events/invitation";

  constructor(public http: Http) {

  }

  index(){
    return this.http.get(this.url + ".json")
      .map(res => res.json());
  }

  create(event, address){
    let d = new Date;
    let new_name = "1" + d.getTime();
    return this.http.post(this.url + ".json", {'event': event, 'address': address, 'cover_photo': {'image': event.cover_photo, 'filename': new_name}})
      .map(res => res.json());
  }

  getCountry(){
    return this.http.get(this.country_url + ".json")
      .map(res => res.json());
  }

  getStates(country){
    return this.http.get(this.states_url + "/" + country + ".json")
      .map(res => res.json());
  }

  getCities(state){
    return this.http.get(this.cities_url + "/" + state + ".json")
      .map(res => res.json());
  }

  invitation(event, user_id){
    return this.http.put(this.invitation_url + "/" + event.id + ".json", {'user': user_id})
      .map(res => res.json());
  }

}
