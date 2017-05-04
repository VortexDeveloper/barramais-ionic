import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { Classified } from '../../providers/classified';
import { ProductModel } from "../../models/product.model";
import { ClassifiedProductDescriptionPage } from '../classified-product-description/classified-product-description';

/*
  Generated class for the ClassifiedProductStatus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-product-status',
  templateUrl: 'classified-product-status.html'
})
export class ClassifiedProductStatusPage {
  classified: ClassifiedModel;
  product: ProductModel;
  classifiedProductDescriptionPage: any = ClassifiedProductDescriptionPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.product = new ProductModel(navParams.data.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedProductStatusPage');
  }

  openNextPage(page, product, classified){
    this.navCtrl.push(page, {'product': product, 'classified': classified});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
