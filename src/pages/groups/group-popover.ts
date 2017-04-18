import { Component } from '@angular/core';

import { ViewController, NavController, App, ModalController, NavParams } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { GroupModel } from "../../models/group.model";
import { User } from '../../providers/user';
import { Posts } from '../../providers/posts';
import { GroupModalPage } from '../groups/group-modal';
import { GroupPagePage } from '../groups/group-page';
import { ToastController } from 'ionic-angular';



@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="openPage('')">Participar</button>
      <button ion-item (click)="accept_group()">Aceitar</button>
      <button ion-item (click)="refuse_group()">Recusar</button>
      <button ion-item (click)="openEditModal(groupModal, group)" *ngIf="showAdminActions">Editar</button>
    </ion-list>
  `
})
export class PopoverPage {

  showAdminActions: boolean = false;
  showMemberActions: boolean = false;
  showInvitedMemberActions: boolean = false;
  groupModal: any = GroupModalPage;
  user: UserModel = new UserModel();
  group: GroupModel = new GroupModel();

  constructor(
    public viewCtrl: ViewController,
    params: NavParams,
    private userProvider: User,
    public navCtrl: NavController,
    // public app: App,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
      this.user = params.data.user;
      this.group = params.data.group;
      this.showAdminActions = params.data.showAdminActions;
      this.showMemberActions = params.data.showMemberActions;
      this.showInvitedMemberActions = params.data.showInvitedMemberActions;
  }

  openPage(page, group) {
    this.navCtrl.push(page, {group: group});
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  refuse_group(){
    this.userProvider.refuse_group(this.user, this.group).
    subscribe(response =>{
      this.presentToast(response.sucess);
      this.viewCtrl.dismiss(this.group);
    }, error =>{
      this.presentToast(error.json());
      this.viewCtrl.dismiss();
      console.log(error.json());
    });
  }

  accept_group(){
    this.userProvider.accept_group(this.user, this.group).
    subscribe(response =>{
      this.presentToast(response.sucess);
      this.viewCtrl.dismiss(this.group);
    }, error =>{
      this.presentToast(error.json());
      this.viewCtrl.dismiss();
      console.log(error.json());
    });
  }

  openEditModal(page, group){
    let modal = this.modalCtrl.create(page, {group: group});
    modal.onDidDismiss(group => {
      if(group){
        this.group = new GroupModel(group);
        this.viewCtrl.dismiss(this.group);
      }
    });
    modal.present();
  }

  // support() {
  //   this.app.getRootNav().push(SupportPage);
  //   this.viewCtrl.dismiss();
  // }

  // close(url: string) {
  //   window.open(url, '_blank');
  //   this.viewCtrl.dismiss();
  // }
}
