import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { FishingModel } from "../../models/fishing.model";
import { ClassifiedFishingDescriptionPage } from '../classified-fishing-description/classified-fishing-description';

/*
  Generated class for the ClassifiedFishingStatus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-fishing-status',
  templateUrl: 'classified-fishing-status.html'
})
export class ClassifiedFishingStatusPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  fishing: FishingModel;
  provisionalCategory: boolean = false;
  classifiedFishingDescriptionPage: any = ClassifiedFishingDescriptionPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this.provisionalCategory = navParams.data.provisionalCategory;
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.fishing = new FishingModel(navParams.data.fishing);

      if(this.provisionalCategory == false){
        this.fishing.provisional_category = "";
      }

      console.log(this.fishing);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedFishingStatusPage');
  }

  openNextPage(page, fishing, classified){
    this.navCtrl.push(page, {'fishing': fishing, 'classified': classified});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
