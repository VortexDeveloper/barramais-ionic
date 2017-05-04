import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassifiedModel } from "../../models/classified.model";
import { Classified } from '../../providers/classified';
import { ProductModel } from "../../models/product.model";

/*
  Generated class for the ClassifiedProductPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-product-preview',
  templateUrl: 'classified-product-preview.html'
})
export class ClassifiedProductPreviewPage {
  classified: ClassifiedModel;
  product: ProductModel;
  classifiedInformation: boolean = false;
  productCategory: any = {};
  productSubCategory: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified
  ) {
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.product = new ProductModel(navParams.data.product);

      this.getProductCategoryById();
      this.getProductSubCategoryById();
      console.log(this.product);
      console.log("this.product");
      console.log(this.product.product_sub_category_id);
      console.log("this.product.product_sub_category_id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedProductPreviewPage');
  }

  getProductCategoryById(){
    this.classifiedProvider.getProductCategoryById(this.product.product_category_id)
    .subscribe(response => {
      this.productCategory = response;
    }, error => {
        console.log(error.json());
    });
  }

  getProductSubCategoryById(){
    this.classifiedProvider.getProductSubCategoryById(this.product.product_sub_category_id)
    .subscribe(response => {
      this.productSubCategory = response;
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
}
