import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

/*
  Generated class for the Ads provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Ads {
  // private host: string = "https://barramais.herokuapp.com/"
  //private host: string = "http://10.0.2.2:3000/"
  private host: string = "http://localhost:3000/"

  private interest_list_url: string = this.host + "ads/interest_list";

  constructor(public http: Http, public authHttp: AuthHttp) {
    console.log('Hello Ads Provider');
  }

  load_interest_list(){
    return this.authHttp.get(this.interest_list_url + ".json")
      .map(res => res.json());
  }

}
