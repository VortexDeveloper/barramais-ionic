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

  private host: string = "http://localhost:3000/";
  //private host: string = "http://10.0.2.2:3000/"
  //private host: string = "https://barramais.herokuapp.com/"

  private index: string = this.host + "conversations.json";

  constructor(public http: Http, public authHttp: AuthHttp) { }

  my_conversations() {
    return this.authHttp.get(this.index)
      .map(res => res.json());
  }
}
