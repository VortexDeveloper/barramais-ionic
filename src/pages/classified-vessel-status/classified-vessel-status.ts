import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";
import { ClassifiedVesselManufacturerPage } from '../classified-vessel-manufacturer/classified-vessel-manufacturer';

/*
  Generated class for the ClassifiedVesselStatus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-vessel-status',
  templateUrl: 'classified-vessel-status.html'
})
export class ClassifiedVesselStatusPage {
  classified: ClassifiedModel;
  vessel: VesselModel;
  ClassifiedVesselManufacturerPage: any = ClassifiedVesselManufacturerPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselStatusPage');
  }

  openNextPage(page, vessel, classified){
    this.navCtrl.push(page, {'vessel': vessel, 'classified': classified});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
