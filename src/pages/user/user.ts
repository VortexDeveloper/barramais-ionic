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

declare var cordova: any;

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  jwtHelper: JwtHelper = new JwtHelper();
  token: any = localStorage.getItem('jwt');
  user_token: any = localStorage.getItem('user');

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
        this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  save(user) {
    this.userProvider.update(user)
    .subscribe(response => {
        localStorage.setItem("user", response.user);
        this.presentToast("Usuário atualizado com sucesso!");
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

}
