import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Routes } from '../providers/routes';

import 'rxjs/add/operator/map';

/*
  Generated class for the Groups provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Groups {

  private host: string;

  private url: string;
  private invitation_url: string;
  private all_members_url: string;
  private confirmed_members_url: string;
  private pending_members_url: string;
  private refused_members_url: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: Routes

  ) {
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
  }

    setRoutes(host){
      this.url = host + "groups";
      this.invitation_url = host + "groups/invitation/";
      this.all_members_url = host + "groups/all_members/";
      this.confirmed_members_url = host + "groups/confirmed_members/";
      this.pending_members_url = host + "groups/pending_members/";
      this.refused_members_url = host + "groups/refused_members/";
    }

    create(group){
      let d = new Date;
      let new_name = group.id + d.getTime();
      return this.authHttp.post(this.url + ".json", {'group': group, 'cover_photo': {'image': group.cover_photo, 'filename': new_name}})
        .map(res => res.json());
    }

    update(group){
      return this.authHttp.put(this.url + "/" + group.id + ".json", {'group': group})
        .map(res => res.json());
    }

    save_cover_photo(group){
      let d = new Date;
      let new_name = group.id + d.getTime();
      return this.http.put(this.url + "/save_cover_photo/" + group.id + ".json", {'cover_photo': {'image': group.cover_photo, 'filename': new_name}})
        .map(res => res.json());
    }

    invitation(group, members){
      return this.authHttp.put(this.invitation_url + group.id + ".json", {'members': members})
        .map(res => res.json());
    }

    all_members(group){
      return this.authHttp.get(this.all_members_url + group.id + ".json")
        .map(res => res.json());
    }

    confirmed_members(group){
      return this.authHttp.get(this.confirmed_members_url + group.id + ".json")
        .map(res => res.json());
    }

    pending_members(group){
      return this.authHttp.get(this.pending_members_url + group.id + ".json")
        .map(res => res.json());
    }

    refused_members(group){
      return this.authHttp.get(this.refused_members_url + group.id + ".json")
        .map(res => res.json());
    }

}
