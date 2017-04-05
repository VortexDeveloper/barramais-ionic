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
import { BmHeaderComponent } from '../components/bm-header/bm-header';
import { Events } from 'ionic-angular';


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
  }

  save(user) {
    if(this.userEmailConfirmation != this.user.email){
      this.presentToast("A confirmação do email deve ser igual ao email!");
    }else if(this.userPasswordConfirmation != this.user.current_password){
      this.presentToast("A confirmação da senha deve ser igual à senha!");
    }else{
      this.userProvider.update(user)
      .subscribe(response => {
          localStorage.setItem("user", response.user);
          this.user_token = response.user;
          this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
          this.presentToast("Usuário atualizado com sucesso!");
          this.events.publish("onUpdateUser", this.jwtHelper.decodeToken(response.user));
      }, error => {
          var errors = error.json().errors;
          var errorMessage;
          for(let campo in errors) {
             for(let campos of errors[campo]){
               errorMessage += "Erro no campo " + campo + ": " + campos + " \n";
             }
          }
          this.presentToast(errorMessage);
      });
    }
    this.userPasswordConfirmation = "";
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

  openPage(page){
    this.navCtrl.push(page);
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
    this.userProvider.save_avatar(user)
    .subscribe(user_params => {
      let image_tag = document.getElementsByTagName('img')[0];
      image_tag.src = this.user.avatar;
    }, error => {
        alert(error.json());
        console.log(JSON.stringify(error.json()));
    });
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
}
