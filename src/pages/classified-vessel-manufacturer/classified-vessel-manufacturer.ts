import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { VesselModel } from "../../models/vessel.model";
import { Classified } from '../../providers/classified';
import { ClassifiedVesselAccessoriesPage } from '../classified-vessel-accessories/classified-vessel-accessories';

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
  classifiedVesselAccessoriesPage: any = ClassifiedVesselAccessoriesPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified
  ) {
      this.getBrands();

      this.classified = new ClassifiedModel(navParams.data.classified);
      this.vessel = new VesselModel(navParams.data.vessel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselManufacturerPage');
  }

  openNextPage(page, vessel){
    this.navCtrl.push(page, {'vessel': vessel, 'classified': this.classified});
  }

  goBack(){
    this.navCtrl.pop();
  }

  getBrands() {
    this.classifiedProvider.getBrands()
    .subscribe(response => {
      this.brands = response.brands;
    }, error => {
        console.log(error.json());
    });
  }

  getMolds() {
    this.classifiedProvider.getMolds(this.vessel.brand_id)
    .subscribe(response => {
      this.molds = response.molds;
    }, error => {
        console.log(error.json());
    });
  }
}
