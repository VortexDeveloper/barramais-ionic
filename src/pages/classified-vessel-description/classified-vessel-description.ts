import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";
import { Camera } from 'ionic-native';
import { ClassifiedVesselPreviewPage } from '../classified-vessel-preview/classified-vessel-preview';

/*
  Generated class for the ClassifiedVesselDescription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-vessel-description',
  templateUrl: 'classified-vessel-description.html'
})
export class ClassifiedVesselDescriptionPage {
  classified: ClassifiedModel;
  vessel: VesselModel;
  accessories: any;
  classifiedVesselPreviewPage: any = ClassifiedVesselPreviewPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);
      this.accessories = navParams.data.accessories;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselDescriptionPage');
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
      this.classified.photo = "data:image/jpeg;base64," + image;
    });

    var image_tag = document.getElementsByTagName('img')[0];
    image_tag.src = this.classified.photo;
  }

  openNextPage(page, classified){
    this.navCtrl.push(page, {'vessel': this.vessel, 'classified': classified, 'accessories': this.accessories});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
