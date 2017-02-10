import { Component } from '@angular/core';
import { ProfilePage } from "../../pages/profile/profile";
import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../../pages/main/main';
/*
  Generated class for the CocoButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'bm-header',
  templateUrl: 'bm-header.html'
})
export class BmHeaderComponent {

  profilePage: any = ProfilePage;
  mainPage: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    }

  openPage(page){
    this.navCtrl.push(page);
  }


}
