import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FeedsPage } from '../feeds/feeds';
import { BmHeaderComponent } from '../components/bm-header/bm-header';
/*
  Generated class for the Groups page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  groups: string = "my-groups";
  profilePage: any = ProfilePage;
  feeds: any = FeedsPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  )
  {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  openPage(page){
    this.navCtrl.push(page);
  }
}
