import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AdvertiserModel } from "../models/advertiser.model";
import 'rxjs/add/operator/map';

/*
  Generated class for the Advertiser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Advertiser {
  private url: string = "https://barramais.herokuapp.com/advertisers";

  public advertiser: AdvertiserModel;

  constructor(public http: Http) {
    console.log('Hello Advertiser Provider');
  }

  create(advertiser){
    return this.http.post(this.url + ".json", {'user': advertiser})
      .map(res => res.json());
  }

}
