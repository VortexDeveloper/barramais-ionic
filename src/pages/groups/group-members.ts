import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';
import { Groups } from "../../providers/groups";
import { User } from "../../providers/user";
import { GroupModel } from "../../models/group.model";
import { ToastController } from 'ionic-angular';
import { JwtHelper } from 'angular2-jwt';
import { UserModel } from "../../models/user.model";
import { Camera } from 'ionic-native';
import { GroupsPage } from "../groups/groups";

/*
  Generated class for the PostModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group-members',
  templateUrl: 'group-members.html'
})
export class GroupMembersPage {

  members: any;
  group: GroupModel = new GroupModel();
  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  selectedMembers: any[] = [];
  all_members: any;
  showAdminActions: boolean = false;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public groupProvider: Groups,
    public userProvider: User,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.group = params.data.group;
      this.group = params.data.group;
      this.verifyGroupAdmin();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }

  verifyGroupAdmin(){
    if(this.group.user_id == this.current_user.id){
      this.showAdminActions = true;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getSelect(isChecked, member) {
    if (isChecked === true) {
      this.selectedMembers.push(member);
    } else {
      this.selectedMembers.splice(this.selectedMembers.indexOf(member), 1);
    }
  }

  invitation(members){
    this.groupProvider.invitation(this.group, members)
    .subscribe(response => {
        console.log(response.members);
        this.presentToast("Usuário(s) convidado(s) com sucesso!");
    }, error => {
        console.log(error.json().error);
        this.presentToast(error.json().error);
    });
    this.clearInvitedMembers();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  clearInvitedMembers(){
    for (let i = 0; i < this.selectedMembers.length; i++) {
        this.members.splice(this.members.indexOf(this.selectedMembers[i]), 1);
    }
  }

}
