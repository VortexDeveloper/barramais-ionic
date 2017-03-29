import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";

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
  accessoriesPrice: number = 0;
  classifiedInformation: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);
      this.accessories = navParams.data.accessories;

      this.calculateAccessoriesPrice();

      console.log(this.classified);
      console.log(this.vessel);
      console.log(this.accessories);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselPreviewPage');
  }

  toggleClassifiedInformation(){
    if(this.classifiedInformation){
      this.classifiedInformation = false;
    }else{
      this.classifiedInformation = true;
    }
  }

  calculateAccessoriesPrice(){
    this.accessoriesPrice = 0;
    for(var i = 0; i < this.accessories.length; i++){
        this.accessoriesPrice = this.accessoriesPrice + this.accessories[i].accessory_price;
    }
  }

  goBack(){
    this.navCtrl.pop();
  }
}
