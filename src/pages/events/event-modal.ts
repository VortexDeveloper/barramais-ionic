import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { EventProvider } from "../../providers/events";
import { EventModel } from "../../models/event.model";
import { AddressModel } from "../../models/address.model";
import { ToastController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { Camera } from 'ionic-native';

/*
  Generated class for the PostModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html'
})
export class EventModalPage {

  event: EventModel = new EventModel();
  address: AddressModel = new AddressModel();
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel;
  cities: any;
  states: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public eventProvider: EventProvider,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
    this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.getStates('1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  create(event, address){
    if(event.name == null || event.name == ""){
      this.presentToast("Preencha o nome do evento!");
    }else if(event.event_date == null || event.event_date == ""){
      this.presentToast("Selecione uma data para o evento!");
    }else if(event.about == null || event.about == ""){
      this.presentToast("Preencha uma descrição para o evento!");
    }else if(address.zip_code == ""){
      this.presentToast("Prencha o CEP!");
    }else if(address.street == ""){
      this.presentToast("Preencha o endereço!");
    }else if(address.complement == ""){
      this.presentToast("Preencha o complemento!");
    }else if(address.state_id == ""){
      this.presentToast("Selecione o estado!");
    }else if(address.city_id == ""){
      this.presentToast("Selecione a cidade!");
    }else if(address.neighborhood == ""){
      this.presentToast("Preencha o bairro!");
    }else{
      event.user_id = this.user.id;
      this.eventProvider.create(event, address)
      .subscribe(event_params => {
          this.event = new EventModel(event_params);
          this.viewCtrl.dismiss(this.event);
          this.presentToast('Evento criado com sucesso!');
      }, error => {
          console.log(error.json());
          this.presentToast(error);
      });
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  getCountry() {
    this.eventProvider.getCountry()
    .subscribe(response => {
      console.log(response);
    }, error => {
        console.log(error.json());
    });
  }

  getStates(country) {
    this.eventProvider.getStates(country)
    .subscribe(response => {
      this.states = response.states;
    }, error => {
        console.log(error.json());
    });
  }

  getCities() {
    this.eventProvider.getCities(this.address.state_id)
    .subscribe(response => {
      this.cities = response.cities;
    }, error => {
        console.log(error.json());
    });
  }

  public presentActionSheet() {
    let actionSheet = this.actionsheetCtrl.create({
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
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 360,
		  targetHeight: 232
    };

    Camera.getPicture(options).then(image => {
      this.event.cover_photo = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.event.cover_photo;
  }

  is_from_gallery(sourceType) {
    sourceType === Camera.PictureSourceType.PHOTOLIBRARY
  }

  is_android() {
    this.platform.is('android')
  }

  delete(event){
    this.eventProvider.delete(event.id)
      .subscribe(response => {
        this.presentToast("Evento removido com sucesso!");
      }, error => {
        console.log("Não foi possível deletar o evento" + error.json());
      })
  }

}
