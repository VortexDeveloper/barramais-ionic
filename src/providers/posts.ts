import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/*
  Generated class for the Posts provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Posts {
  private host: string = "https://barramais.herokuapp.com/posts";
  // private host: string = "http://localhost:3000/posts";
  // private host: string = "http://10.0.2.2:3000/posts";


  private create_url: string = this.host + ".json";
  private index_url: string = this.host + ".json";
  private user: any;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {
    console.log('Hello Posts Provider');
  }

  create(post) {
    console.log(post);
    return this.authHttp.post(this.create_url, post)
      .map(res => res.json());
  }

  index() {
    return this.authHttp.get(this.index_url)
      .map(res => res.json());
  }

  like(post) {
    return this.authHttp.get(this.like_url(post))
      .map(res => res.json());
  }

  comment(post, comment) {
    return this.authHttp.post(this.comment_url(post), {comment: comment})
      .map(res => res.json());
  }

  post_comments(post) {
    return this.authHttp.get(this.post_comments_url(post))
      .map(res => res.json());
  }

  like_url(post) {
    return this.host + '/' + post.id + '/like.json';
  }

  comment_url(post) {
    return this.host + '/' + post.id + '/comment.json';
  }

  post_comments_url(post) {
    return this.host + '/' + post.id + '/comments.json';
  }
}
