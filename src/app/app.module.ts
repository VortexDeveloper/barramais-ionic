import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FeedsPage } from '../pages/feeds/feeds';
import { GroupsPage } from '../pages/groups/groups';
import { EventsPage } from '../pages/events/events';
import { UserPage } from '../pages/user/user';
import { User } from '../providers/user';
import { RegistrationPage } from '../pages/registration/registration';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { PostModalPage } from '../pages/post-modal/post-modal';
import { ElasticHeader } from '../components/elastic-header/elastic-header';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
import { FriendshipRequestPage } from '../pages/friendship-request/friendship-request';
import { LoginPage } from '../pages/login/login';
import { CocoButtonComponent } from '../components/coco-button/coco-button';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

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
    ElasticHeader,
    ProfilePage,
    FriendsPage,
    FriendshipRequestPage,
    LoginPage,
    CocoButtonComponent
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
    ProfilePage,
    FriendsPage,
    FriendshipRequestPage,
    LoginPage,
    CocoButtonComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    User,
    {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]}
  ]
})
export class AppModule {}
