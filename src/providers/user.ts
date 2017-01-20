import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  private url: string = "http://localhost:3000/users";

  constructor(public http: Http) {
    console.log('Hello User Provider');
  }

  // Adiciona um user na API
  create(user){
    return this.http.post(this.url + ".json", {'user': user})
      .map(res => res.json())
      .subscribe(data => {
          alert('Usuário cadastrado com sucesso!');
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
  }

}
