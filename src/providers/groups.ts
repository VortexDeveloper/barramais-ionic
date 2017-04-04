import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/*
  Generated class for the Groups provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Groups {

  private host: string = "http://10.0.2.2:3000/";
  // private host: string = "https://barramais.herokuapp.com/";
  // private host: string = "http://localhost:3000/";

  private url: string = this.host + "groups";
  private invitation_url: string = this.host + "groups/invitation/";
  private all_members_url: string = this.host + "groups/all_members/";
  private confirmed_members_url: string = this.host + "groups/confirmed_members/";
  private pending_members_url: string = this.host + "groups/pending_members/";
  private refused_members_url: string = this.host + "groups/refused_members/";

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {

  }

    create(group){
      let d = new Date;
      let new_name = group.id + d.getTime();
      return this.authHttp.post(this.url + ".json", {'group': group, 'cover_photo': {'image': group.cover_photo, 'filename': new_name}})
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
