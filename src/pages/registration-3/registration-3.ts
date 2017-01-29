import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { HomePage } from "../home/home";
import { Registration4Page } from '../registration4/registration4';
import { ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams}  from 'ionic-angular';
import { ViewController,Platform, LoadingController }  from 'ionic-angular';
import { Loading } from 'ionic-angular';
import { Camera, File, FilePath } from 'ionic-native';
import { FeedsPage } from '../feeds/feeds';

declare var cordova: any;


@Component({
  selector: 'page-registration-3',
  templateUrl: 'registration-3.html'
})
export class Registration3Page {

  user: UserModel;
  avatar: string;
  rootPage = HomePage;
  showNauticalWorkText: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public loadingCtrl: LoadingController
  ) {
        this.user = new UserModel(JSON.parse(localStorage.getItem("current_user")));
        console.log(this.user);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration3Page');
  }

  save(user) {
    this.userProvider.update(user)
    .subscribe(user_params => {
        this.user = new UserModel(user_params);
        this.presentToast("Usuário cadastrado com sucesso!");
        this.move_to_photopage(this.user);
    }, error => {
        console.log(error.json().errors);
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

  move_to_photopage(user: UserModel) {
    this.navCtrl.push(Registration4Page, { user: user });
  }

  hideNautical(){
    this.showNauticalWorkText = !this.showNauticalWorkText;
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
      this.user.avatar = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.user.avatar;
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
      this.navCtrl.setRoot(FeedsPage, {}, {animate: true, direction: 'forward'});
    }, error => {
        alert(error.json());
        console.log(JSON.stringify(error.json()));
    });
  }

}
