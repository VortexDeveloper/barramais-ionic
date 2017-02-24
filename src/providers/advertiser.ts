import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AdvertiserModel } from "../models/advertiser.model";
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

/*
  Generated class for the Advertiser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Advertiser {
  private host: string = "https://barramais.herokuapp.com/";

  private url: string = this.host + "advertisers";

  public advertiser: AdvertiserModel;

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) { }

  create(advertiser){
    return this.http.post(this.url + ".json", {'advertiser': advertiser})
      .map(res => res.json());
  }

}
