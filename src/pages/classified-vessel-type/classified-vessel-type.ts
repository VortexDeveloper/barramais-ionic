import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { ClassifiedModel } from "../../models/classified.model";
import { UserModel } from "../../models/user.model";
import { VesselModel } from "../../models/vessel.model";
import { ClassifiedVesselStatusPage } from '../classified-vessel-status/classified-vessel-status';


/*
  Generated class for the ClassifiedVesselType page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classified-vessel-type',
  templateUrl: 'classified-vessel-type.html'
})
export class ClassifiedVesselTypePage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  classified: ClassifiedModel;
  vessel: VesselModel;
  classifiedVesselStatusPage: any = ClassifiedVesselStatusPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
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

      this.vessel = new VesselModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifiedVesselTypePage');
  }

  openNextPage(page, vessel){
    this.navCtrl.push(page, {'vessel': vessel, 'classified': this.classified});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
