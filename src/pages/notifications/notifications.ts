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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User
  ) {
      this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
      this.get_notifications();
      this.get_all_users();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  get_notifications(){
    this.userProvider.get_all_notifications(this.current_user.id)
      .subscribe(response =>{
        this.notifications = response;
        console.log(this.notifications);

        //lógica para adquirir os usuários que notificaram, sem repetição
      }, error =>{
          console.log("Erro ao exibir as notificações" + error.json());
      });
  }

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
