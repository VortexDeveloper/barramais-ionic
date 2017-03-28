import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { ProfilePage } from '../pages/profile/profile';
import { EventsPage } from '../pages/events/events';
import { UserPage } from '../pages/user/user';
import { AdvertiserPage } from '../pages/advertiser/advertiser';
import { AdsPage } from '../pages/ads/ads';
import { MidiaKitPage } from '../pages/midia-kit/midia-kit';
import { TermsPage } from '../pages/terms/terms';
import { PrivacyPage } from '../pages/privacy/privacy';
import { InAppBrowser } from 'ionic-native';
import { ConversationPage } from '../pages/conversation/conversation';
import { AdBannersPage } from '../pages/ad-banners/ad-banners';
import { AdInterestsPage } from '../pages/ad-interests/ad-interests';
import { AdDescriptionsPage } from '../pages/ad-descriptions/ad-descriptions';
import { AdPreviewPage } from '../pages/ad-preview/ad-preview';
import { AdListPage } from '../pages/ad-list/ad-list';
import { LoginPage } from '../pages/login/login';
import { AdvertisersPage } from '../pages/advertisers/advertisers';
import { AdvertiserPaymentPage } from '../pages/advertiser-payment/advertiser-payment';
import { ClassifiedPage } from '../pages/classified/classified';
import { ClassifiedVesselTypePage } from '../pages/classified-vessel-type/classified-vessel-type';
import { ClassifiedVesselStatusPage } from '../pages/classified-vessel-status/classified-vessel-status';
import { ClassifiedVesselManufacturerPage } from '../pages/classified-vessel-manufacturer/classified-vessel-manufacturer';
import { AlertController } from 'ionic-angular';
import { UserModel } from "../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../providers/user';
import { MenuController } from 'ionic-angular';

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
  adsPage: any = AdsPage;
  showPaginas: boolean = false;
  showAnuncios: boolean = false;
  showClassificados: boolean = false;
  termsPage: any = TermsPage;
  privacyPage: any = PrivacyPage;
  conversationPage: any = ConversationPage;
  midiaKitPage: any = MidiaKitPage;
  adBannersPage: any = AdBannersPage;
  adInterestsPage: any = AdInterestsPage;
  adDescriptionsPage: any = AdDescriptionsPage;
  adPreviewPage: any = AdPreviewPage;
  adListPage: any = AdListPage;
  advertisersPage: any = AdvertisersPage;
  advertiserPaymentPage: any = AdvertiserPaymentPage;
  classifiedPage: any = ClassifiedPage;
  classifiedVesselTypePage: any = ClassifiedVesselTypePage;
  classifiedVesselStatusPage: any = ClassifiedVesselStatusPage;
  ClassifiedVesselManufacturerPage: any = ClassifiedVesselManufacturerPage;
  loginPage: any = LoginPage;
  eventsPage: any = EventsPage;
  // user: UserModel;
  // jwtHelper: JwtHelper = new JwtHelper();
  // user_token: any;

  openLink(link){
    let browser = new InAppBrowser(link, '_system');
  }

  constructor(
    public platform: Platform,
    private alertCtrl: AlertController,
    private userProvider: User,
    private menuCtrl: MenuController
  ) {
      if (localStorage.getItem("jwt")){
        this.rootPage = this.mainPage;
      }
      this.initializeApp();
      // console.log(localStorage.getItem('user'));
      // if(localStorage.getItem('user') != null){
      //   this.user_token = localStorage.getItem('user');
      //   this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      // }
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

  showSubMenuAnuncios() {
    this.showAnuncios = !this.showAnuncios;
  }

  showSubMenuPaginas() {
    this.showPaginas = !this.showPaginas;
  }

  showSubMenuClassificados() {
    this.showClassificados = !this.showClassificados;
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Sair',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.userProvider.logout().subscribe(
              (response) => {
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
                this.rootPage = this.loginPage;
                this.nav.setRoot(this.rootPage);
              },
              (error) => console.log(error)
            );
            console.log('Abrir a página de sair');
          }
        }
      ]
    });
    alert.present();
  }
  // $('.menu_side_sub').hide();
  // $('.menu_side_item').click(function () {
  //     $(this).children('.menu_side_sub').slideToggle('slow');
  // });

}
