import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { Classified } from '../../providers/classified';
import { ProductModel } from "../../models/product.model";
import { ClassifiedProductStatusPage } from '../classified-product-status/classified-product-status';

/*
  Generated class for the ClassifiedProductCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-product-category',
  templateUrl: 'classified-product-category.html'
})
export class ClassifiedProductCategoryPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  product: ProductModel;
  productCategories: any;
  productSubCategories: any;
  productSubCategories2: any;
  isSubCategoryEmpty: boolean = false;
  classifiedProductStatusPage: any = ClassifiedProductStatusPage;
  isSubCategory2Empty: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public classifiedProvider: Classified
  ) {
      this.getProductCategories();

      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.classified = new ClassifiedModel(navParams.data.classified);
      if(this.classified.bonded == true){
        if(this.classified.document_type == 0){
          this.classified.seller_name = this.current_user.first_name;
        }

        this.classified.email = this.current_user.email;
        this.classified.cell_phone = this.current_user.cellphone;
      }

      console.log(this.classified);

      this.product = new ProductModel();

      this.getProductSubCategories();
      this.getProductSubCategories2();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedProductCategoryPage');
  }

  getProductCategories(){
    this.classifiedProvider.getProductCategories()
      .subscribe(response => {
        this.productCategories = response;
      }, error => {
        console.log(error.json());
      });
  }

  getProductSubCategories(){
    this.classifiedProvider.getProductSubCategories(this.product.product_category_id)
    .subscribe(response => {
    this.productSubCategories = response;
    if(this.productSubCategories.length <= 0){
      this.isSubCategoryEmpty = true;
    }else{
      this.isSubCategoryEmpty = false;
    }
    }, error => {
    console.log(error.json());
    });
  }

  getProductSubCategories2(){
    this.classifiedProvider.getProductSubCategories2(this.product.product_sub_category_2_id)
    .subscribe(response => {
    this.productSubCategories2 = response;
    if(this.productSubCategories2.length <= 0){
      this.isSubCategory2Empty = true;
    }else{
      this.isSubCategory2Empty = false;
    }
    }, error => {
    console.log(error.json());
    });
  }

  openNextPage(page, product){
    this.navCtrl.push(page, {'product': product, 'classified': this.classified});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
