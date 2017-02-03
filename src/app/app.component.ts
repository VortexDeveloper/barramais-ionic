import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { UserPage } from '../pages/user/user';
import { UserModel } from "../../models/user.model";

@Component({
  selector: 'app-menu',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  mainPage: any = MainPage;
  profilePage: any = ProfilePage;
  userPage: any = UserPage;

  current_user: UserModel = new UserModel();
  token: any;

  constructor(
    public platform: Platform
  ) {

      if (localStorage.getItem("jwt")){
        this.current_user = "";
        this.token = localStorage.getItem("jwt");
        this.rootPage = this.mainPage;
      }

      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page);
  }
}
