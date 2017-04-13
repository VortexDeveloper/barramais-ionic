import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { FishingModel } from "../../models/fishing.model";
import { Classified } from '../../providers/classified';
import { ClassifiedFishingStatusPage } from '../classified-fishing-status/classified-fishing-status';

/*
  Generated class for the ClassifiedFishing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-fishing',
  templateUrl: 'classified-fishing.html'
})
export class ClassifiedFishingPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  fishing: FishingModel;
  fishingCategories: any;
  fishingSubCategories: any;
  provisionalCategory: boolean = false;
  classifiedFishingStatusPage: any = ClassifiedFishingStatusPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private classifiedProvider: Classified
  ) {
      this.getFishingCategories();

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

      this.fishing = new FishingModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedFishingPage');
  }

  getFishingCategories() {
    this.classifiedProvider.getFishingCategories()
    .subscribe(response => {
      this.fishingCategories = response.fishing_categories;
    }, error => {
        console.log(error.json());
    });
  }

  getFishingSubCategories() {
    this.classifiedProvider.getFishingSubCategories(this.fishing.fishing_category_id)
    .subscribe(response => {
      this.fishingSubCategories = response.fishing_sub_categories;
    }, error => {
        console.log(error.json());
    });
  }

  openNextPage(page, provisionalCategory, fishing){
    this.navCtrl.push(page, {'provisionalCategory': provisionalCategory, 'fishing': fishing, 'classified': this.classified});
  }

  goBack(){
    this.navCtrl.pop();
  }
}