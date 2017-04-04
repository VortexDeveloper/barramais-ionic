import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
/*
  Generated class for the Conversations provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Conversations {

  private host: string = "http://localhost:3000/conversations";
  // private host: string = "http://10.0.2.2:3000/conversations";
  // private host: string = "https://barramais.herokuapp.com/conversations";

  private conversation_url: string = this.host + ".json";
  private conversation_messages_url: string = "/messages.json";

  constructor(public http: Http, public authHttp: AuthHttp) { }

  my_conversations() {
    return this.authHttp.get(this.conversation_url)
      .map(res => res.json());
  }

  conversation_messages(conversation_id) {
    return this.authHttp.get(this.host + "/" + conversation_id + this.conversation_messages_url)
      .map(res => res.json());
  }

  create(user) {
    return this.authHttp.post(this.conversation_url, {user_id: user.id})
      .map(res => res.json());
  }
}
