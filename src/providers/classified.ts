import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

/*
  Generated class for the Classified provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Classified {
  // private host: string = "http://10.0.2.2:3000/";
  // private host: string = "https://barramais.herokuapp.com/";
  private host: string = "http://localhost:3000/";

  private url: string = this.host + "classifieds";
  private create_vessel_url: string = this.host + "classifieds/create_vessel"
  private brand_url: string = this.host + "classifieds/get_brand_by_id/";
  private mold_url: string = this.host + "classifieds/get_mold_by_id/";
  private brands_url: string = this.host + "classifieds/brands_for_select";
  private molds_url: string = this.host + "classifieds/molds_for_select/";
  private accessories_url: string = this.host + "classifieds/accessories_for_select";
  private communications_url: string = this.host + "classifieds/communications_for_select";
  private eletronics_url: string = this.host + "classifieds/eletronics_for_select";

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {}

  createVessel(classified, vessel, accessories){
    return this.authHttp.post(this.create_vessel_url + ".json", {'classified': classified, 'vessel': vessel, 'accessories': accessories})
      .map(res => res.json());
  }

  getBrandById(brand){
    return this.authHttp.get(this.brand_url + brand + ".json")
      .map(res => res.json());
  }

  getMoldById(mold){
    return this.authHttp.get(this.mold_url + mold + ".json")
      .map(res => res.json());
  }

  getBrands(){
    return this.authHttp.get(this.brands_url + ".json")
      .map(res => res.json());
  }

  getMolds(brand){
    return this.authHttp.get(this.molds_url + brand + ".json")
      .map(res => res.json());
  }

  getAccessories(){
    return this.authHttp.get(this.accessories_url + ".json")
      .map(res => res.json());
  }

  getCommunications(){
    return this.authHttp.get(this.communications_url + ".json")
      .map(res => res.json());
  }

  getEletronics(){
    return this.authHttp.get(this.eletronics_url + ".json")
      .map(res => res.json());
  }
}
