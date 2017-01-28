import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { FeedsPage } from '../pages/feeds/feeds';
import { GroupsPage } from '../pages/groups/groups';
import { EventsPage } from '../pages/events/events';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';


@Component({
  selector: 'app-menu',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  feed: any = FeedsPage;
  groups: any = GroupsPage;
  events: any = EventsPage;
  home: any = HomePage;

  constructor(public platform: Platform) {
    if (localStorage.getItem("current_user")){
      this.rootPage = MainPage;
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
