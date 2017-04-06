import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { UserPage } from '../user/user';
import { FeedsPage } from '../feeds/feeds';
import { GroupsPage } from '../groups/groups';
import { EventsPage } from '../events/events';
import { GroupMembersPage } from "../groups/group-members";
import { FriendsPage } from '../friends/friends';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';
import { Groups } from '../../providers/groups';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-group-page',
  templateUrl: 'group-page.html'
})
export class GroupPagePage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel;
  userPage: any = UserPage;
  feedsPage: any = FeedsPage;
  groupsPage: any = GroupsPage;
  eventsPage: any = EventsPage;
  friendsPage: any = FriendsPage;
  group: any;
  postModal: any = PostModalPage;
  groupMembers: any = GroupMembersPage;
  allMembers: any;
  l_allMembers: any;
  confirmedMembers: any;
  l_confirmedMembers: any;
  pendingMembers: any;
  l_pendingMembers: any;
  refusedMembers: any;
  l_refusedMembers: any;
  showAdminActions: boolean = false;
  showMemberActions: boolean = false;
  showInvitedMemberActions: boolean = false;
  friends: any;

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public groupProvider: Groups,
    private userProvider: User,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
      this.user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.group = params.data.group;
      this.verifyGroupAdmin();
      this.loadMembers(this.group);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  loadMembers(group){
    this.pending_members(group);
    this.confirmed_members(group);
    this.all_members(group);
    this.refused_members(group);
    this.userFriends(group);
  }

  openPage(page, group) {
    this.navCtrl.push(page, {group: group});
  }

  openModal(page, members) {
    let modal = this.modalCtrl.create(page, {group: this.group, members: members});
    modal.onDidDismiss(group => {
      this.loadMembers(this.group);
    });
    modal.present();
  }

  verifyGroupAdmin(){
    if(this.group.admin.id == this.user.id){
      this.showAdminActions = true;
      this.showMemberActions = false;
    }
  }

  verifyGroupMember(list){
    var members_id = [];
    for(let user of list) members_id.push(user.id);
    if(members_id.indexOf(this.user.id) > -1 ){
      this.showMemberActions = true;
      this.verifyGroupAdmin();
    }
  }

  verifyInvitedGroupMember(list){
    var members_id = [];
    for(let user of list) members_id.push(user.id);
    if(members_id.indexOf(this.user.id) > -1 ){
      this.showInvitedMemberActions = true;
      this.verifyGroupAdmin();
    }
  }

  all_members(group){
    this.groupProvider.all_members(group)
      .subscribe(response =>{
        this.allMembers = response.all_members;
        this.l_allMembers = response.all_members.length;
        this.verifyInvitedGroupMember(this.allMembers);
      }, error =>{
        console.log("Erro ao exibir os membros: " + error.json());
      });
  }

  confirmed_members(group){
    this.groupProvider.confirmed_members(group)
      .subscribe(response =>{
        this.confirmedMembers = response.confirmed_members;
        this.l_confirmedMembers = response.confirmed_members.length;
        this.verifyGroupMember(this.confirmedMembers);
      }, error =>{
        console.log("Erro ao exibir os membros: " + error.json());
      });
  }

  pending_members(group){
    this.groupProvider.pending_members(group)
      .subscribe(response =>{
        this.pendingMembers= response.pending_members;
        this.l_pendingMembers = response.pending_members.length;
      }, error =>{
        console.log("Erro ao exibir os membros: " + error.json());
      });
  }

  refused_members(group){
    this.groupProvider.refused_members(group)
      .subscribe(response =>{
        this.refusedMembers = response.refused_members;
        this.l_refusedMembers = response.refused_members.length;
      }, error =>{
        console.log("Erro ao exibir os convidados: " + error.json());
      });
  }

  userFriends(group){
    this.userProvider.group_friends(group.id)
    .subscribe(response => {
      this.friends = response.users;
    }, error => {
      console.log(error.json());
    });
  }

  refuse_group(){
    this.userProvider.refuse_group(this.user, this.group).
    subscribe(response =>{
      this.openPage(GroupPagePage, this.group);
      this.presentToast(response.sucess);
    }, error =>{
      this.presentToast(error.json());
      console.log(error.json());
    });
  }

  accept_group(){
    this.userProvider.accept_group(this.user, this.group).
    subscribe(response =>{
      this.openPage(GroupPagePage, this.group);
      this.presentToast(response.sucess);
    }, error =>{
      this.presentToast(error.json());
      console.log(error.json());
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
