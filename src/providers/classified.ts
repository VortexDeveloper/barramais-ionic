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
  private brands_url: string = this.host + "classifieds/brands_for_select";
  private molds_url: string = this.host + "classifieds/molds_for_select";

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {}

  getBrands(){
    return this.authHttp.get(this.brands_url + ".json")
      .map(res => res.json());
  }

  getMolds(brand){
    return this.authHttp.get(this.molds_url + brand + ".json")
      .map(res => res.json());
  }
}
