import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { UserPage } from '../pages/user/user';
import { AdvertiserPage } from '../pages/advertiser/advertiser';
import { AdvertiserAdsPage } from '../pages/advertiser/advertiser-ads';
import { AdvertiserAdCreatePage } from '../pages/advertiser/advertiser-ad-create';
import { AdsPage } from '../pages/ads/ads';
import { InAppBrowser } from 'ionic-native';


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
  advertiserPage: any = AdvertiserPage;
  advertiserAdsPage: any = AdvertiserAdsPage;
  advertiserAdCreatePage: any = AdvertiserAdCreatePage;
  adsPage: any = AdsPage;

  openSite(){
    let browser = new InAppBrowser('http://barramais.com.br/blog/', '_system');
  }

  constructor(
    public platform: Platform
  ) {

      if (localStorage.getItem("jwt")){
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
