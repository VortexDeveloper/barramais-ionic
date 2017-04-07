import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Routes } from '../providers/routes';

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

  private host: string;
  private url: string;
  private event_friends_url: string;
  private group_friends_url: string;
  private my_events_url: string;
  private confirmed_events_url: string;
  private pending_events_url: string;
  private accept_event_url: string;
  private refuse_event_url: string;
  private user_advertiser_url: string;
  private user_friends_url: string;
  private accept_friendship_url: string;
  private refuse_friendship_url: string;
  private request_friendship_url: string;
  private is_friend_of_url: string;
  private pending_friendships_url: string;
  private unfriend_url: string;
  private my_groups_url: string;
  private confirmed_groups_url: string;
  private pending_groups_url: string;
  private accept_group_url: string;
  private refuse_group_url: string;
  private load_nautical_sports_url: string;
  private load_state_for_travels_url: string;
  private load_country_for_travels_url: string;
  private get_user_album_url: string;
  private user_album_url: string;
  private get_interests_by_user_url: string;
  private interests_url: string;
  private update_user_interests_url: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes

  ) {
      this.host = this.routesProvider.host();
      this.setRoutes(this.host);
   }

  setRoutes(host){
    this.url = host + "users";
    this.event_friends_url = host + "users/event_friends/";
    this.group_friends_url = host + "users/group_friends/";
    this.my_events_url = host + "users/my_events/";
    this.confirmed_events_url = host + "users/confirmed_events/";
    this.pending_events_url = host + "users/pending_events/";
    this.accept_event_url = host + "users/accept_event/";
    this.refuse_event_url = host + "users/refuse_event/";
    this.user_advertiser_url = host + "users/user_advertiser/";
    this.user_friends_url = host + "users/user_friends/";
    this.accept_friendship_url = host + "users/accept_friendship/";
    this.refuse_friendship_url = host + "users/refuse_friendship/";
    this.request_friendship_url = host + "users/request_friendship/";
    this.is_friend_of_url = host + "users/is_friend_of/";
    this.pending_friendships_url = host + "users/pending_friendships";
    this.unfriend_url = host + "users/unfriend/";
    this.my_groups_url = host + "users/my_groups";
    this.confirmed_groups_url = host + "users/confirmed_groups";
    this.pending_groups_url = host + "users/pending_groups";
    this.accept_group_url = host + "users/accept_group";
    this.refuse_group_url = host + "users/refuse_group";
    this.load_nautical_sports_url = host + "users/load_nautical_sports";
    this.load_state_for_travels_url = host + "users/load_state_for_travels";
    this.load_country_for_travels_url = host + "users/load_country_for_travels";
    this.get_user_album_url = host + "album_photos/get_user_album/";
    this.user_album_url = host + "album_photos"
    this.update_user_interests_url = host + "users/update_user_interests";
    this.get_interests_by_user_url = host + "interests/get_interests_by_user/";
    this.interests_url = host + "interests";
  }

  update_user_interests(user_id, userInterests){
    return this.authHttp.put(this.update_user_interests_url + "/" + user_id + ".json", {'user_interests': userInterests})
      .map(res => res.json());
  }

  get_interests_by_user(user_id){
    return this.authHttp.get(this.get_interests_by_user_url + "/" + user_id + ".json")
      .map(res => res.json());
  }

  get_interests(){
    return this.authHttp.get(this.interests_url + ".json")
      .map(res => res.json());
  }

  create_album_photo(albumPhoto){
    return this.authHttp.post(this.user_album_url + ".json", {'album_photo': albumPhoto})
      .map(res => res.json());
  }

  update_album_photo(albumPhoto){
    return this.authHttp.put(this.user_album_url + "/" + albumPhoto.id + ".json", {'album_photo': albumPhoto})
      .map(res => res.json());
  }

  get_user_album(user_id){
    return this.authHttp.get(this.get_user_album_url + user_id + ".json")
      .map(res => res.json());
  }

  destroy_user_album_photo(photo_id){
    return this.authHttp.delete(this.user_album_url + "/" + photo_id + ".json")
      .map(res => res.json());
  }

  load_nautical_sports(){
    return this.authHttp.get(this.load_nautical_sports_url + ".json")
      .map(res => res.json());
  }

  load_state_for_travels(){
    return this.authHttp.get(this.load_state_for_travels_url + ".json")
      .map(res => res.json());
  }

  load_country_for_travels(){
    return this.authHttp.get(this.load_country_for_travels_url + ".json")
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

  save_cover_photo(user){
    let d = new Date;
    let new_name = user.id + d.getTime();

    return this.http.put(this.url + "/" + user.id + "/" + "save_cover_photo.json", {'cover_photo': {'image': user.cover_photo, 'filename': new_name}})
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
