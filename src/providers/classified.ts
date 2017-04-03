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
  private classified_user_url: string = this.host + "classifieds/get_classifieds_by_user/"
  private destroy_url: string = this.host + "classifieds/"
  private create_vessel_url: string = this.host + "classifieds/create_vessel"
  private create_fishing_url: string = this.host + "classifieds/create_fishing"
  private brand_url: string = this.host + "classifieds/get_brand_by_id/";
  private mold_url: string = this.host + "classifieds/get_mold_by_id/";
  private brands_url: string = this.host + "classifieds/brands_for_select";
  private molds_url: string = this.host + "classifieds/molds_for_select/";
  private accessories_url: string = this.host + "classifieds/accessories_for_select";
  private communications_url: string = this.host + "classifieds/communications_for_select";
  private eletronics_url: string = this.host + "classifieds/eletronics_for_select";
  private fishing_category_url: string = this.host + "classifieds/get_fishing_category_by_id/"
  private fishing_sub_category_url: string = this.host + "classifieds/get_fishing_sub_category_by_id/"
  private fishing_categories_url: string = this.host + "classifieds/fishing_categories_for_select";
  private fishing_sub_categories_url: string = this.host + "classifieds/fishing_sub_categories_for_select/"

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {}

  createVessel(classified, vessel, accessories){
    return this.authHttp.post(this.create_vessel_url + ".json", {'classified': classified, 'vessel': vessel, 'accessories': accessories})
      .map(res => res.json());
  }

  createFishing(classified, fishing){
    return this.authHttp.post(this.create_fishing_url + ".json", {'classified': classified, 'fishing': fishing})
      .map(res => res.json());
  }

  destroy(classified){
    return this.authHttp.delete(this.destroy_url + classified + ".json")
      .map(res => res.json());
  }

  getClassifiedsByUser(user){
    return this.authHttp.get(this.classified_user_url + user + ".json")
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

  getFishingCategoryById(category){
    return this.authHttp.get(this.fishing_category_url + category + ".json")
      .map(res => res.json());
  }

  getFishingSubCategoryById(subCategory){
    return this.authHttp.get(this.fishing_sub_category_url + subCategory + ".json")
      .map(res => res.json());
  }

  getFishingCategories(){
    return this.authHttp.get(this.fishing_categories_url + ".json")
      .map(res => res.json());
  }

  getFishingSubCategories(fishing_category){
    return this.authHttp.get(this.fishing_sub_categories_url + fishing_category + ".json")
      .map(res => res.json());
  }
}
