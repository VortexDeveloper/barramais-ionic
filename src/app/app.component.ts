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
import { AlbumListPage } from '../pages/album-list/album-list';
import { AlbumPhotoCreatePage } from '../pages/album-photo-create/album-photo-create';
import { AdBannersPage } from '../pages/ad-banners/ad-banners';
import { AdInterestsPage } from '../pages/ad-interests/ad-interests';
import { AdDescriptionsPage } from '../pages/ad-descriptions/ad-descriptions';
import { AdPreviewPage } from '../pages/ad-preview/ad-preview';
import { AdListPage } from '../pages/ad-list/ad-list';
import { LoginPage } from '../pages/login/login';
import { AdvertisersPage } from '../pages/advertisers/advertisers';
import { AdvertiserPaymentPage } from '../pages/advertiser-payment/advertiser-payment';
import { ClassifiedUserListPage } from '../pages/classified-user-list/classified-user-list';
import { ClassifiedPage } from '../pages/classified/classified';
import { ClassifiedVesselTypePage } from '../pages/classified-vessel-type/classified-vessel-type';
import { ClassifiedVesselStatusPage } from '../pages/classified-vessel-status/classified-vessel-status';
import { ClassifiedVesselManufacturerPage } from '../pages/classified-vessel-manufacturer/classified-vessel-manufacturer';
import { ClassifiedVesselAccessoriesPage } from '../pages/classified-vessel-accessories/classified-vessel-accessories';
import { ClassifiedVesselDescriptionPage } from '../pages/classified-vessel-description/classified-vessel-description';
import { ClassifiedVesselPreviewPage } from '../pages/classified-vessel-preview/classified-vessel-preview';
import { ClassifiedFishingPage } from '../pages/classified-fishing/classified-fishing';
import { ClassifiedFishingStatusPage } from '../pages/classified-fishing-status/classified-fishing-status';
import { ClassifiedFishingDescriptionPage } from '../pages/classified-fishing-description/classified-fishing-description';
import { ClassifiedFishingPreviewPage } from '../pages/classified-fishing-preview/classified-fishing-preview';
import { ClassifiedProductCategoryPage } from '../pages/classified-product-category/classified-product-category';
import { AlertController } from 'ionic-angular';
import { UserModel } from "../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../providers/user';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { InterestSelectionPage } from '../pages/interest-selection/interest-selection';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NotificationViewPage } from '../pages/notification-view/notification-view';

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
  showAjudaESuporte: boolean = false;
  showBlog: boolean = false;
  showConvidarAmigos: boolean = false;
  termsPage: any = TermsPage;
  privacyPage: any = PrivacyPage;
  conversationPage: any = ConversationPage;
  midiaKitPage: any = MidiaKitPage;
  albumListPage: any = AlbumListPage;
  albumPhotoCreatePage: any = AlbumPhotoCreatePage;
  adBannersPage: any = AdBannersPage;
  adInterestsPage: any = AdInterestsPage;
  adDescriptionsPage: any = AdDescriptionsPage;
  adPreviewPage: any = AdPreviewPage;
  adListPage: any = AdListPage;
  advertisersPage: any = AdvertisersPage;
  advertiserPaymentPage: any = AdvertiserPaymentPage;
  classifiedUserListPage: any = ClassifiedUserListPage;
  classifiedPage: any = ClassifiedPage;
  classifiedVesselTypePage: any = ClassifiedVesselTypePage;
  classifiedVesselStatusPage: any = ClassifiedVesselStatusPage;
  classifiedVesselManufacturerPage: any = ClassifiedVesselManufacturerPage;
  classifiedVesselAccessoriesPage: any = ClassifiedVesselAccessoriesPage;
  classifiedVesselDescriptionPage: any = ClassifiedVesselDescriptionPage;
  classifiedVesselPreviewPage: any = ClassifiedVesselPreviewPage;
  classifiedFishingPage: any = ClassifiedFishingPage;
  classifiedFishingStatusPage: any = ClassifiedFishingStatusPage;
  classifiedFishingDescriptionPage: any = ClassifiedFishingDescriptionPage;
  classifiedFishingPreviewPage: any = ClassifiedFishingPreviewPage;
  classifiedProductCategoryPage: any = ClassifiedProductCategoryPage;
  interestSelectionPage: any = InterestSelectionPage;
  loginPage: any = LoginPage;
  eventsPage: any = EventsPage;

  user: UserModel = new UserModel();
  jwtHelper: JwtHelper = new JwtHelper();
  user_token: any;

  options: NativeTransitionOptions = {
     direction: 'up',
     duration: 500,
     slowdownfactor: 3,
     slidePixels: 20,
     iosdelay: 100,
     androiddelay: 150,
     fixedPixelsTop: 0,
     fixedPixelsBottom: 60
    };

  openLink(link){
    let browser = new InAppBrowser(link, '_system');
    browser
  }

  constructor(
    public platform: Platform,
    private alertCtrl: AlertController,
    private userProvider: User,
    private menuCtrl: MenuController,
    public events: Events,
    private nativePageTransitions: NativePageTransitions,
    public fb: Facebook
  ) {
      this.checkMainPage();
      this.initializeApp();
      this.setUser();
      events.subscribe('onUpdateUser', (user) => { this.user = new UserModel(user) });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  setUser(){
    if(localStorage.getItem("user")){
      this.user = new UserModel(this.jwtHelper.decodeToken(localStorage.getItem("user")));
    }
  }

  checkMainPage(){
    if (localStorage.getItem("user")){
      this.rootPage = this.mainPage;
    }
  }

  checkCurrentUser(){
    this.events.subscribe('onUpdateUser', (user)=>{this.user = new UserModel(user);});
  }

  openPageWithClassifiedConditional(page, classifiedConditional){
    this.nav.push(page, {'classifiedConditional': classifiedConditional});
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

  showSubMenuAjudaESuporte() {
    this.showAjudaESuporte = !this.showAjudaESuporte;
  }

  showSubMenuBlog() {
    this.showBlog = !this.showBlog;
  }

  showSubMenuConvidarAmigos() {
    this.showConvidarAmigos = !this.showConvidarAmigos;
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
                localStorage.removeItem("vessels_type");
                this.nav.setRoot(HomePage);
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


  openPage(page) {
    this.nativePageTransitions.slide(this.options);
    this.nav.push(page);
  }

  inviteFacebookFriends() {
    let options = {
      url: "https://fb.me/202248836944012",
      picture: "https://placehold.it/350x350"
    }
    this.fb.appInvite(options).then(
      (obj) => console.log(obj),
      (error) => {
        alert(error);
        console.log(error)
      }
    );
  }

}
