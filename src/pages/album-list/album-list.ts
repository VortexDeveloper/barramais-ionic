import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { User } from '../../providers/user';
import { MainPage } from '../main/main';
import { AlbumPhotoCreatePage } from '../album-photo-create/album-photo-create';

/*
  Generated class for the AlbumList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-album-list',
  templateUrl: 'album-list.html'
})
export class AlbumListPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  album: any[] = [];
  isAlbumEmpty: boolean = false;
  mainPage: any = MainPage;
  albumPhotoCreatePage: any = AlbumPhotoCreatePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.getUserAlbum();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumListPage');
  }

  getUserAlbum(){
    this.userProvider.get_user_album(this.current_user.id)
      .subscribe(response =>{
        console.log(response);
        this.album = response;
        this.checkIfAlbumIsEmpty();
      }, error => {
        console.log("Erro ao carregar a lista de classificados" + error.json())
      });
  }

  destroy(photo){
    this.userProvider.destroy_user_album_photo(photo.id)
    .subscribe(response => {
    });
    this.clearRemovedPhoto(photo);
    this.checkIfAlbumIsEmpty();
  }

  clearRemovedPhoto(removedItem){
      this.album.splice(this.album.indexOf(removedItem), 1);
  }

  checkIfAlbumIsEmpty(){
    if(this.album.length < 1){
      this.isAlbumEmpty = true;
    }
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  openEditPage(page, albumPhoto){
    this.navCtrl.push(page, {'albumPhoto': albumPhoto});
  }

  goBack(){
    this.navCtrl.setRoot(this.mainPage);
  }
}
