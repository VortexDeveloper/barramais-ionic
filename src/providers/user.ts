import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserModel } from '../models/user.model';
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

  //private url: string = "http://localhost:3000/users";
  private url: string = "https://barramais.herokuapp.com/users";

  public user: UserModel;

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) { }


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


  save_avatar(user){
    let d = new Date;
    let new_name = user.id + d.getTime();

    return this.http.put(this.url + "/" + user.id + "/" + "save_avatar.json", {'avatar': {'image': user.avatar, 'filename': new_name}})
      .map(res => res.json());
  }
}
