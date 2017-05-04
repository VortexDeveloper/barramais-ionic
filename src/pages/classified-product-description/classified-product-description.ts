import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { Classified } from '../../providers/classified';
import { ProductModel } from "../../models/product.model";
import { Camera } from 'ionic-native';
import { ClassifiedProductPreviewPage } from '../classified-product-preview/classified-product-preview';

/*
  Generated class for the ClassifiedProductDescription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-product-description',
  templateUrl: 'classified-product-description.html'
})
export class ClassifiedProductDescriptionPage {
  classified: ClassifiedModel;
  product: ProductModel;
  classifiedProductPreviewPage: any = ClassifiedProductPreviewPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.product = new ProductModel(navParams.data.product)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedProductDescriptionPage');
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
    this.navCtrl.push(page, {'product': this.product, 'classified': classified});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
