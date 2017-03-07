import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  //private host: string = "https://barramais.herokuapp.com/"
  //private host: string = "http://10.0.2.2:3000/"
  private host: string = "http://localhost:3000/"

  private url: string = this.host + "users";
  private friends_url: string = this.host + "users/friends";
  private my_events_url: string = this.host + "users/my_events/";
  private confirmed_events_url: string = this.host + "users/confirmed_events/";
  private pending_events_url: string = this.host + "users/pending_events/";
  private accept_event_url: string = this.host + "users/accept_event/";
  private refuse_event_url: string = this.host + "users/refuse_event/";
  private user_advertiser_url: string = this.host + "users/user_advertiser/";


  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {

   }


  create(user){
    return this.http.post(this.url + ".json", {'user': user})
      .map(res => res.json());
  }

  update(user){
      return this.authHttp.put(this.url + ".json", {'user': user})
        .map(res => res.json());
  }

  // Session sign_up : (post)users.json
  login(user){
    return this.http.post(this.url + "/sign_in.json", {'user': user})
      .map(res => res.json());
  }

  friends(){
    return this.authHttp.get(this.friends_url + ".json")
      .map(res => res.json());
  }

  myEvents(current_user){
    return this.authHttp.get(this.my_events_url + current_user.id + ".json")
      .map(res => res.json());
  }

  confirmedEvents(current_user){
    return this.authHttp.get(this.confirmed_events_url + current_user.id + ".json")
      .map(res => res.json());
  }

  pendingEvents(current_user){
    return this.authHttp.get(this.pending_events_url + current_user.id + ".json")
      .map(res => res.json());
  }

  accept_event(current_user, event){
    return this.authHttp.put(this.accept_event_url + current_user.id + ".json", {'event': event.id})
    .map(res => res.json());
  }

  refuse_event(current_user, event){
    return this.authHttp.put(this.refuse_event_url + current_user.id + ".json", {'event': event.id})
    .map(res => res.json());
  }

  save_avatar(user){
    let d = new Date;
    let new_name = user.id + d.getTime();

    return this.http.put(this.url + "/" + user.id + "/" + "save_avatar.json", {'avatar': {'image': user.avatar, 'filename': new_name}})
      .map(res => res.json());
  }

  userAdvertiser(current_user){
    return this.authHttp.get(this.user_advertiser_url + current_user.id + ".json")
      .map(res => res.json());
  }

}
