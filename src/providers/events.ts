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

  private url: string = "http://barramais.herokuapp.com/events";
  private country_url: string = "http://barramais.herokuapp.com/events/country_for_select";
  private states_url: string = "http://barramais.herokuapp.com/events/states_for_select";
  private cities_url: string = "http://barramais.herokuapp.com/events/cities_for_select";

  constructor(public http: Http) {

  }

  index(){
    return this.http.get(this.url + ".json")
    .map(res => res.json());
  }

  create(event, address){
    return this.http.post(this.url + ".json", {'event': event, 'address': address})
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

  save_cover_photo(event){
    let d = new Date;
    let new_name = event.id + d.getTime();
    return this.http.put(this.url + "/" + event.id + "/" + "save_cover_photo.json", {'cover_photo': {'image': event.cover_photo, 'filename': new_name}})
      .map(res => res.json());
  }

}
