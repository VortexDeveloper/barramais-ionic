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

  // private host: string = "http://10.0.2.2:3000/"
  // private host: string = "https://barramais.herokuapp.com/";
  private host: string = "http://localhost:3000/";

  private url: string = this.host + "users";
  private event_friends_url: string = this.host + "users/event_friends/";
  private group_friends_url: string = this.host + "users/group_friends/";
  private my_events_url: string = this.host + "users/my_events/";
  private confirmed_events_url: string = this.host + "users/confirmed_events/";
  private pending_events_url: string = this.host + "users/pending_events/";
  private accept_event_url: string = this.host + "users/accept_event/";
  private refuse_event_url: string = this.host + "users/refuse_event/";
  private user_advertiser_url: string = this.host + "users/user_advertiser/";
  private user_friends_url: string = this.host + "users/user_friends/";
  private accept_friendship_url: string = this.host + "users/accept_friendship/";
  private refuse_friendship_url: string = this.host + "users/refuse_friendship/";
  private request_friendship_url: string = this.host + "users/request_friendship/";
  private is_friend_of_url: string = this.host + "users/is_friend_of/";
  private pending_friendships_url: string = this.host + "users/pending_friendships";
  private unfriend_url: string = this.host + "users/unfriend/";
  private my_groups_url: string = this.host + "users/my_groups";
  private confirmed_groups_url: string = this.host + "users/confirmed_groups";
  private pending_groups_url: string = this.host + "users/pending_groups";
  private accept_group_url: string = this.host + "users/accept_group";
  private refuse_group_url: string = this.host + "users/refuse_group";
  private load_nautical_sports_url: string = this.host + "users/load_nautical_sports";

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {

   }

  load_nautical_sports(){
    return this.authHttp.get(this.load_nautical_sports_url + ".json")
      .map(res => res.json());
  }

  getUser(user_id){
    return this.authHttp.get(this.url + "/" + user_id + ".json")
      .map(res => res.json());
  }

  create(user){
    return this.http.post(this.url + ".json", {'user': user})
      .map(res => res.json());
  }

  update(user){
    return this.authHttp.put(this.url + ".json", {'user': user})
      .map(res => {
        let user_token = res.json();
        localStorage.setItem("user", user_token.user);
        return user_token;
      });
  }

  // Session sign_up : (post)users.json
  login(user){
    return this.http.post(this.url + "/sign_in.json", {'user': user})
      .map(res => res.json());
  }

  logout(){
    return this.authHttp.delete(this.url + "/sign_out.json")
      .map(res => res.json());
  }

  event_friends(event){
    return this.authHttp.get(this.event_friends_url + event + ".json")
      .map(res => res.json());
  }

  group_friends(group){
    return this.authHttp.get(this.group_friends_url + group + ".json")
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

  myGroups(current_user){
    return this.authHttp.get(this.my_groups_url + ".json")
      .map(res => res.json());
  }

  confirmedGroups(current_user){
    return this.authHttp.get(this.confirmed_groups_url + ".json")
      .map(res => res.json());
  }

  pendingGroups(current_user){
    return this.authHttp.get(this.pending_groups_url + ".json")
      .map(res => res.json());
  }

  accept_group(current_user, group){
    return this.authHttp.put(this.accept_group_url + ".json", {'group': group.id})
    .map(res => res.json());
  }

  refuse_group(current_user, group){
    return this.authHttp.put(this.refuse_group_url + ".json", {'group': group.id})
    .map(res => res.json());
  }

  save_avatar(user){
    let d = new Date;
    let new_name = user.id + d.getTime();

    return this.http.put(this.url + "/" + user.id + "/" + "save_avatar.json", {'avatar': {'image': user.avatar, 'filename': new_name}})
      .map(res => {
        let user_token = res.json();
        localStorage.setItem("user", user_token.user);
        return user_token;
      });
  }

  userAdvertiser(current_user){
    return this.authHttp.get(this.user_advertiser_url + current_user.id + ".json")
      .map(res => res.json());
  }

  user_friends(user) {
    return this.authHttp.get(this.user_friends_url + user.id + ".json" )
      .map(res => res.json());
  }

  accept_friendship(user){
    return this.authHttp.get(this.accept_friendship_url + user.id + ".json" )
      .map(res => res.json());
  }

  refuse_friendship(user){
    return this.authHttp.get(this.refuse_friendship_url + user.id + ".json" )
      .map(res => res.json());
  }

  request_friendship(user){
    return this.authHttp.get(this.request_friendship_url + user.id + ".json" )
      .map(res => res.json());
  }

  is_friend_of(user){
    return this.authHttp.get(this.is_friend_of_url + user.id + ".json")
      .map(res => res.json());
  }

  pending_friendships(){
    return this.authHttp.get(this.pending_friendships_url + ".json")
      .map(res => res.json());
  }

  unfriend(user){
    return this.authHttp.get(this.unfriend_url + user.id + ".json")
      .map(res => res.json());
  }

  user_list(){
    return this.authHttp.get(this.url + ".json")
      .map(res => res.json());
  }

}
