import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { HomePage } from "../home/home";
import { ToastController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams}  from 'ionic-angular';
import { ViewController,Platform, LoadingController }  from 'ionic-angular';
import { Camera } from 'ionic-native';
import { FeedsPage } from '../feeds/feeds';
import { ProfilePage } from '../profile/profile';
import { JwtHelper } from 'angular2-jwt';
import { Events } from 'ionic-angular';
import { MainPage } from '../main/main';
import { EditPasswordPage } from './edit-password';


declare var cordova: any;

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  jwtHelper: JwtHelper = new JwtHelper();
  token: any = localStorage.getItem('jwt');
  user_token: any = localStorage.getItem('user');
  nauticalSports: any[] = [];
  stateForTravels: any[] = [];
  countryForTravels: any[] = [];
  user: UserModel;
  avatar: string;
  rootPage = HomePage;
  showNauticalWorkText: boolean = false;
  showNauticalLicenses: boolean = false;
  showNavalPatents: boolean = false;
  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;
  accountInformations: boolean = false;
  personalInformations: boolean = false;
  nauticalInformations: boolean = false;
  interestInformations: boolean = false;
  vessels_type: Array<any>;
  showVesselsType: boolean = true;
  userEmailConfirmation: string = "";
  userPasswordConfirmation: string = "";
  inviteFriendsMenu: boolean = false;
  selectedAreas: any[] = [];
  selectedStates: any[] = [];
  selectedCountries: any[] = [];
  stateTrip: boolean = false;
  countryTrip: boolean = false;
  interests: any[] = [];
  userInterests: any[] = [];
  mainPage: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public events: Events

  ) {
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.populateVesselsType();
    this.load_nautical_sports();
    this.load_state_for_travels();
    this.load_country_for_travels();
    this.getInterests();
    this.getUserInterests();
    this.getUserNauticalSports();
  }

  save(user) {
    if(this.userInterests.length > 7 || this.userInterests.length < 4){
      this.presentToast("Escolha de 3(três) a 6(seis) interesses para prosseguir.")
    }else{
      let loader = this.loadingCtrl.create({
        content: "Salvando seus dados..."
      });

      loader.present();

      this.updateUserInterests();
      this.updateUserNauticalSports();

      this.userProvider.update(user)
      .subscribe(response => {
          localStorage.setItem("user", response.user);
          this.user_token = response.user;
          this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
          this.presentToast("Usuário atualizado com sucesso!");
          this.events.publish("onUpdateUser", this.jwtHelper.decodeToken(response.user));
          this.redirectPage(this.mainPage);
          loader.dismiss();
      }, error => {
          var errors = error.json().errors;
          var errorMessage;
          for(let campo in errors) {
             for(let campos of errors[campo]){
               errorMessage += "Erro no campo " + campo + ": " + campos + " \n";
             }
          }
          loader.dismiss();
          this.presentToast(errorMessage);
      });

      this.userPasswordConfirmation = "";
    }
  }

  editPassword() {
    this.userProvider.get_devise_token().subscribe(
      (devise_token_jwt) => {
        this.openPage(EditPasswordPage, {devise_token: devise_token_jwt});
      },
      (error) => console.log(error)
    );
  }

  deleteAccount() {
    let alert = this.alertCtrl.create({
      title: 'Deletar Conta',
      message: 'Tem certeza que deseja remover sua conta?',
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
            let loader = this.loadingCtrl.create({
              content: "Removendo sua conta, aguarde..."
            });

            loader.present();

            this.userProvider.delete().subscribe(
              (response) => {
                window.localStorage.removeItem("jwt");
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("vessels_type");
                this.navCtrl.setRoot(HomePage);
                this.presentToast("Sua conta foi removida com sucesso!");
                loader.dismiss();
              },
              (error) => {console.log(error);
                           loader.dismiss();
                         }
            );
          }
        }
      ]
    });

    alert.present();

    // this.userProvider.delete()
    //   .subscribe(response => {
    //     window.localStorage.removeItem("user");
    //     window.localStorage.removeItem("jwt");
    //     window.localStorage.removeItem("vessels_type");
    //     this.navCtrl.setRoot(HomePage);
    //     this.presentToast("Sua conta foi removida com sucesso!");
    //   }, error => {
    //     console.log(error.json());
    //   });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

  openPage(page, options={}){
    this.navCtrl.push(page, options);
  }

  hideNautical(){
    this.showNauticalWorkText = !this.showNauticalWorkText;
  }

  hideNauticalLicenses(){
    this.showNauticalLicenses = !this.showNauticalLicenses;
  }

  hideNavalPatents(){
    this.showNavalPatents = !this.showNavalPatents;
  }

  showNauticalInformations(){
    this.nauticalInformations = !this.nauticalInformations;
  }

  showPersonalInformations(){
    this.personalInformations = !this.personalInformations;
  }

  showAccountInformations(){
    this.accountInformations = !this.accountInformations;
  }

  showInterestInformations(){
    this.interestInformations = !this.interestInformations;
  }

  toggleInviteFriendsMenu() {
    this.inviteFriendsMenu = !this.inviteFriendsMenu;
  }

  showOwnVesselsType() {
    // toggleInformatin();
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a origem da imagem',
      buttons: [
        {
          text: 'Carregar da Galeria',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      allowEdit: true,
      //mediaType: Camera.MediaType.ALLMEDIA,
      destinationType: Camera.DestinationType.DATA_URL
    };

    Camera.getPicture(options).then(image => {
      let prompt = this.alertCtrl.create({
        title: 'Usar foto',
        message: 'Deseja usar esta foto como foto de perfil?',
        buttons: [
          {
            text: 'Não',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Sim',
            handler: data => {
              this.user.avatar = "data:image/jpeg;base64," + image;
              this.save_avatar(this.user);
            }
          }
        ]
      });
      prompt.present();
    });
  }

  is_from_gallery(sourceType) {
    sourceType === Camera.PictureSourceType.PHOTOLIBRARY
  }

  is_android() {
    this.platform.is('android')
  }

  save_avatar(user) {
      let loader = this.loadingCtrl.create({
        content: "Salvando avatar..."
      });

      loader.present();

      this.userProvider.save_avatar(user)
      .subscribe(token_params => {
        localStorage.setItem("user", token_params.user);
        this.user_token = token_params.user;
        this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
        this.events.publish("onUpdateUser", this.jwtHelper.decodeToken(token_params.user));
        this.presentToast("Avatar salvo com sucesso!");
      }, error => {
        this.presentToast(error.json());
        console.log(JSON.stringify(error.json()));
      }, () => {
        loader.dismiss();
      }
    );
  }

  populateVesselsType() {
    this.vessels_type = JSON.parse(localStorage.getItem('vessels_type'));
    for (let vessel_type of this.vessels_type) {
      if(this.user.own_vessels_id.indexOf(vessel_type.id) != -1)
        vessel_type.checked = true;
    }
  }


  includeVesselTypeToOwnVessels(vessel_type) {
    let position = this.user.own_vessels_id.indexOf(vessel_type.id);
    if(position != -1) {
      this.user.own_vessels_id.splice(position, 1);
    } else {
      this.user.own_vessels_id.push(vessel_type.id);
    }
  }

  load_nautical_sports(){
    this.userProvider.load_nautical_sports()
      .subscribe(response =>{
        this.nauticalSports = response;
        console.log(response);
      }, error => {
          console.log("Erro ao exibir os esportes náuticos" + error.json());
      });
  }

  load_state_for_travels(){
    this.userProvider.load_state_for_travels()
      .subscribe(response =>{
        this.stateForTravels = response;
      }, error => {
        console.log("Erro ao exibir os estados" + error.json());
      });
  }

  load_country_for_travels(){
    this.userProvider.load_country_for_travels()
      .subscribe(response =>{
        this.countryForTravels = response;
      }, error =>{
          console.log("Erro ao exibir os países" + error.json());
      });
  }

  toggleUserSelectedArea(nauticalSport){
    var found = false;
    for(var i = 0; i < this.selectedAreas.length; i++){
      if(this.selectedAreas[i].name == nauticalSport.name){
        this.selectedAreas.splice(this.selectedAreas.indexOf(this.selectedAreas[i]), 1);
        found = true;
      }
    }

    if(!found){
      this.selectedAreas.push(nauticalSport);
    }

    console.log(this.selectedAreas);
  }

  toggleUserSelectedState(stateForTravel){
    var found = false;
    for(var i = 0; i < this.selectedStates.length; i++){
      if(this.selectedStates[i].name == stateForTravel.name){
        this.selectedStates.splice(this.selectedStates.indexOf(this.selectedStates[i]), 1);
        found = true;
      }
    }

    if(!found){
      this.selectedStates.push(stateForTravel);
    }

    console.log(this.selectedStates);
  }

  toggleUserSelectedCountry(countryForTravel){
    var found = false;
    for(var i = 0; i < this.selectedCountries.length; i++){
      if(this.selectedCountries[i].name == countryForTravel.name){
        this.selectedCountries.splice(this.selectedCountries.indexOf(this.selectedCountries[i]), 1);
        found = true;
      }
    }

    if(!found){
      this.selectedCountries.push(countryForTravel);
    }

    console.log(this.selectedCountries);
  }

  checkSelectedAreas(nauticalSport){
    var check = false;
    for(var i = 0; i < this.selectedAreas.length; i++){
      if(this.selectedAreas[i].name == nauticalSport.name){
        check = true;
      }
    }

    return check;
  }

  checkSelectedStates(stateForTravel){
    var check = false;
    for(var i = 0; i < this.selectedStates.length; i++){
      if(this.selectedStates[i].name == stateForTravel.name){
        check = true;
      }
    }

    return check;
  }

  checkSelectedCountries(countryForTravel){
    var check = false;
    for(var i = 0; i < this.selectedCountries.length; i++){
      if(this.selectedCountries[i].name == countryForTravel.name){
        check = true;
      }
    }

    return check;
  }

  getInterests(){
    this.userProvider.get_interests()
      .subscribe(response =>{
        this.interests = response;
        // console.log(this.interests);
      }, error => {
        console.log("Erro ao exibir os interesses" + error.json());
      });
  }

  getUserInterests(){
    this.userProvider.get_interests_by_user(this.user.id)
      .subscribe(response =>{
        this.userInterests = response;
        // console.log(this.userInterests);
      }, error => {
        console.log("Erro ao exibir os interesses do usuário" + error.json());
      });
  }

  getUserNauticalSports(){
    this.userProvider.get_nautical_sports_by_user(this.user.id)
      .subscribe(response =>{
        this.selectedAreas = response;
        console.log(this.selectedAreas);
      }, error => {
        console.log("Erro ao exibir os interesses do usuário" + error.json());
      });
  }

  checkUserInterests(interest){
    var check = false;
    for(var i = 0; i < this.userInterests.length; i++){
      if(this.userInterests[i].id == interest.id){
        check = true;
      }
    }

    return check;
  }

  toggleUserInterests(interest){
    var found = false;
    for(var i = 0; i < this.userInterests.length; i++){
      if(this.userInterests[i].id == interest.id){
        this.userInterests.splice(this.userInterests.indexOf(this.userInterests[i]), 1);
        found = true;
      }
    }

    if(!found){
      this.userInterests.push(interest);
    }

    // console.log(this.selectedAreas);
  }

  updateUserInterests(){
    this.userProvider.update_user_interests(this.user.id, this.userInterests)
      .subscribe(response =>{
        // this.presentToast("Lista de interesses atualizada com sucesso!")
      }, error => {
        console.log("Erro ao atualizar os interesses do usuário" + error.json());
      });
  }

  updateUserNauticalSports(){
    this.userProvider.update_user_nautical_sports(this.user.id, this.selectedAreas)
      .subscribe(response =>{

      }, error =>{
        console.log("Erro ao atualizar os esportes do usuário" + error.json());
      });
  }

  show_save_button(){
    if(this.accountInformations || this.personalInformations || this.nauticalInformations || this.interestInformations){
      return true;
    }
  }

  redirectPage(page){
    this.navCtrl.setRoot(page);
  }
}
