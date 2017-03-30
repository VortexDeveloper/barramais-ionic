import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";
import { Classified } from '../../providers/classified';
import { ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';

/*
  Generated class for the ClassifiedVesselPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-vessel-preview',
  templateUrl: 'classified-vessel-preview.html'
})
export class ClassifiedVesselPreviewPage {
  classified: ClassifiedModel;
  vessel: VesselModel;
  accessories: any;
  brand: any = {};
  mold: any = {};
  classifiedInformation: boolean = false;
  mainPage: any = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified,
    public toastCtrl: ToastController
  ) {
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);
      this.accessories = navParams.data.accessories;

      this.getVesselBrand();
      this.getVesselMold();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselPreviewPage');
  }

  save(){
    this.classifiedProvider.createVessel(this.classified, this.vessel, this.accessories)
    .subscribe(response => {
        this.redirectPage(this.mainPage);
        this.presentToast("Classificado criado com sucesso!");
    }, error => {
        console.log(error.json());
        this.presentToast(error.json());
    });
  }

  getVesselBrand() {
    this.classifiedProvider.getBrandById(this.vessel.brand_id)
    .subscribe(response => {
      this.brand = response.brand;
    }, error => {
        console.log(error.json());
    });
  }

  getVesselMold() {
    this.classifiedProvider.getMoldById(this.vessel.mold_id)
    .subscribe(response => {
      this.mold = response.mold;
    }, error => {
        console.log(error.json());
    });
  }

  toggleClassifiedInformation(){
    if(this.classifiedInformation){
      this.classifiedInformation = false;
    }else{
      this.classifiedInformation = true;
    }
  }

  redirectPage(page){
    this.navCtrl.setRoot(page);
  }

  goBack(){
    this.navCtrl.pop();
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
