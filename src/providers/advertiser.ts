import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AdvertiserModel } from "../models/advertiser.model";
import { AdModel } from "../models/ad.model";
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

/*
  Generated class for the Advertiser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Advertiser {
  private host: string = "http://localhost:3000/"
  // private host: string = "https://barramais.herokuapp.com/";

  private url: string = this.host + "advertisers";
  private country_url: string = this.host + "advertisers/country_for_select";
  private states_url: string = this.host + "advertisers/states_for_select/";
  private cities_url: string = this.host + "advertisers/cities_for_select/";
  private create_ad_url: string = this.host + "advertisers/create_ad";
  private destroy_ad: string = this.host + "ads/";

  public advertiser: AdvertiserModel;
  public ad: AdModel;

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) { }

  create(advertiser, address){
    return this.authHttp.post(this.url + ".json", {'advertiser': advertiser, 'address': address})
      .map(res => res.json());
  }

  createAd(ad){
    return this.authHttp.post(this.create_ad_url + ".json", {'ad': ad})
      .map(res => res.json())
  }

  destroy(ad){
    return this.authHttp.delete(this.destroy_ad + ad.id + ".json")
      .map(res => res.json())
  }

  getCountry(){
    return this.authHttp.get(this.country_url + ".json")
      .map(res => res.json());
  }

  getStates(country){
    return this.authHttp.get(this.states_url + country + ".json")
      .map(res => res.json());
  }

  getCities(state){
    return this.authHttp.get(this.cities_url + state + ".json")
      .map(res => res.json());
  }

}
