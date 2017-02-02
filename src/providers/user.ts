import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UserModel } from '../models/user.model'

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

  private url: string = "http://localhost:3000/users";
  //private url: string = "http://10.0.2.2:3000/users";
  public user: UserModel;

  constructor(
    public http: Http
  ) { }


  create(user){
    return this.http.post(this.url + ".json", {'user': user})
      .map(res => res.json());
  }

  update(user){
    let headers = new Headers;
    headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1MCwiZXhwIjoxNDg2MDY3OTQzfQ.69yLYHd5I1QiB1xK5dK7DlOwBo4DCs8T6Lf92KBh8r0');
    return this.http.put(this.url + ".json", {'user': user}, {headers: headers})
      .map(res => {
        if(res.status == 204) {
          return JSON.parse('{"saved": true}');
        }
      });
  }


  // Registration sign_up : (post)users.json
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
