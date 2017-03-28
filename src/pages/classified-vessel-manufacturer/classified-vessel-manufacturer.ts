import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";
import { Classified } from '../../providers/classified';

/*
  Generated class for the ClassifiedVesselManufacturer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-vessel-manufacturer',
  templateUrl: 'classified-vessel-manufacturer.html'
})
export class ClassifiedVesselManufacturerPage {
  classified: ClassifiedModel;
  vessel: VesselModel;
  brands: any;
  molds: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified
  ) {
      this.getBrands();

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);

      console.log(this.classified);
      console.log(this.vessel);
      console.log(this.brands);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselManufacturerPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  getBrands() {
    this.classifiedProvider.getBrands()
    .subscribe(response => {
      console.log(response.brands);
      this.brands = response.brands;
    }, error => {
        console.log(error.json());
    });
  }

  getMolds(brand) {
    this.classifiedProvider.getMolds(brand)
    .subscribe(response => {
    }, error => {
        console.log(error.json());
    });
  }
}
