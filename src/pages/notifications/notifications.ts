import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';

/*
  Generated class for the Notifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  jwtHelper: JwtHelper = new JwtHelper();
  current_user: UserModel;
  user_token: any = localStorage.getItem('user');
  notifications: any[] = [];
  users: any[] = [];
  finalUsers: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.get_notifications();
      // this.get_user_by_notification(this.notifications);
      this.get_all_users();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  get_notifications(){
    this.userProvider.get_all_notifications(this.current_user.id)
      .subscribe(response =>{
        // console.log(response);
        this.notifications = response;

        // console.log(this.notifications.length);

        // this.users = [];
        // this.finalUsers = [];
        //
        // for(var i = 0; i < this.notifications.length; i++){
        //   this.userProvider.getUser(this.notifications[i].notifiable.user_id)
        //     .subscribe(response => {
        //       this.users.push(response);
        //     }, error =>{
        //       console.log("Erro ao exibir o usuário" + error.json());
        //     });
        // }
        //
        // var found = false;
        //
        // for(var i = 0; i < this.users.length; i++){
        //   found = false;
        //
        //   for(var j = 0; j < this.finalUsers.length; j++){
        //     if(this.users[i].id == this.finalUsers[j].id){
        //       found = true;
        //     }
        //   }
        //
        //   if(!found){
        //     this.finalUsers.push(this.users[i]);
        //   }
        // }
        //
        // console.log(this.finalUsers);
      }, error =>{
        console.log("Erro ao exibir as notificações" + error.json());
      });
  }

  // get_user_by_notification(notifications){
  //   console.log(notifications)
  //   this.users = [];
  //
  //   for(var i = 0; i < notifications.length; i++){
  //     this.userProvider.getUser(notifications[i].notifiable.user_id)
  //       .subscribe(response => {
  //         console.log(response);
  //         this.users.push(response);
  //       }, error =>{
  //         console.log("Erro ao exibir o usuário" + error.json());
  //       });
  //   }
  // }

  get_all_users(){
    this.userProvider.user_list()
      .subscribe(response =>{
        this.users = response;
        console.log(this.users);
      }, error =>{
        console.log("Erro ao listar os usuários" + error.json);
      });
  }
}
