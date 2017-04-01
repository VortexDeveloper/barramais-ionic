import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { FishingModel } from "../../models/fishing.model";

/*
  Generated class for the ClassifiedFishingPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-fishing-preview',
  templateUrl: 'classified-fishing-preview.html'
})
export class ClassifiedFishingPreviewPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  fishing: FishingModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this.classified = new ClassifiedModel(navParams.data.classified);
      this.fishing = new FishingModel(navParams.data.fishing);

      console.log(this.classified);
      console.log(this.fishing);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedFishingPreviewPage');
  }

}
