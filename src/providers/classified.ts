import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Routes } from '../providers/routes';

import 'rxjs/add/operator/map';

/*
  Generated class for the Classified provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Classified {

  private host: string;

  private url: string;
  private classified_user_url: string;
  private destroy_url: string;
  private create_vessel_url: string;
  private brand_url: string;
  private mold_url: string;
  private brands_url: string;
  private molds_url: string;
  private accessories_url: string;
  private communications_url: string;
  private eletronics_url: string;
  private fishing_categories_url: string;
  private fishing_sub_categories_url: string;
  private create_fishing_url: string;
  private fishing_category_url: string;
  private fishing_sub_category_url: string;


  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes
  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
  }

  setRoutes(host){
    this.url = host + "classifieds";
    this.classified_user_url = host + "classifieds/get_classifieds_by_user/";
    this.destroy_url = host + "classifieds/";
    this.create_vessel_url = host + "classifieds/create_vessel";
    this.brand_url = host + "classifieds/get_brand_by_id/";
    this.mold_url = host + "classifieds/get_mold_by_id/";
    this.brands_url = host + "classifieds/brands_for_select";
    this.molds_url = host + "classifieds/molds_for_select/";
    this.accessories_url = host + "classifieds/accessories_for_select";
    this.communications_url = host + "classifieds/communications_for_select";
    this.eletronics_url = host + "classifieds/eletronics_for_select";
    this.fishing_categories_url = host + "classifieds/fishing_categories_for_select";
    this.fishing_sub_categories_url = host + "classifieds/fishing_sub_categories_for_select/";
    this.create_fishing_url = host + "classifieds/create_fishing";
    this.fishing_category_url = host + "classifieds/get_fishing_category_by_id/";
    this.fishing_sub_category_url = host + "classifieds/get_fishing_sub_category_by_id/";
  }

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
