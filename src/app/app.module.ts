import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FeedsPage } from '../pages/feeds/feeds';
import { GroupsPage } from '../pages/groups/groups';
import { EventsPage } from '../pages/events/events';
import { UserPage } from '../pages/user/user';
import { User } from '../providers/user';
import { EventProvider } from '../providers/events';
import { RegistrationPage } from '../pages/registration/registration';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { PostModalPage } from '../pages/post-modal/post-modal';
import { EventModalPage } from '../pages/events/event-modal';
import { EventGuestsPage } from '../pages/events/event-guests';
import { EventPagePage } from '../pages/events/event-page';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { FriendshipRequestPage } from '../pages/friendship-request/friendship-request';
import { LoginPage } from '../pages/login/login';
import { CocoButtonComponent } from '../components/coco-button/coco-button';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { AdvertiserPage } from '../pages/advertiser/advertiser';

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json', 'Content-Type': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('jwt')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    FeedsPage,
    GroupsPage,
    EventsPage,
    UserPage,
    RegistrationPage,
    HomePage,
    MainPage,
    PostModalPage,
    EventModalPage,
    EventGuestsPage,
    EventPagePage,
    ElasticHeader,
    ProfilePage,
    FriendsPage,
    FriendshipRequestPage,
    LoginPage,
    CocoButtonComponent,
    BmHeaderComponent,
    AdvertiserPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedsPage,
    GroupsPage,
    EventsPage,
    UserPage,
    RegistrationPage,
    HomePage,
    MainPage,
    PostModalPage,
    EventModalPage,
    EventGuestsPage,
    EventPagePage,
    ProfilePage,
    FriendsPage,
    FriendshipRequestPage,
    LoginPage,
    CocoButtonComponent,
    BmHeaderComponent,
    AdvertiserPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    User,
    EventProvider,
    {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]}
  ]
})
export class AppModule {}
