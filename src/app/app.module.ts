import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FeedsPage } from '../pages/feeds/feeds';
import { GroupsPage } from '../pages/groups/groups';
import { EventsPage } from '../pages/events/events';
import { UserPage } from '../pages/user/user';
import { User } from '../providers/user';
import { Registration1Page } from '../pages/registration-1/registration-1';
import { Registration2Page } from '../pages/registration-2/registration-2';
import { Registration3Page } from '../pages/registration-3/registration-3';
import { Registration4Page } from '../pages/registration4/registration4';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    FeedsPage,
    GroupsPage,
    EventsPage,
    UserPage,
    Registration1Page,
    Registration2Page,
    Registration3Page,
    Registration4Page,
    LoginPage,
    HomePage
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
    Registration1Page,
    Registration2Page,
    Registration3Page,
    Registration4Page,
    LoginPage,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, User]
})
export class AppModule {}
