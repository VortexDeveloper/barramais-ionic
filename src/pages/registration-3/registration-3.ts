import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { UserModel } from "../../models/user.model";
import { HomePage } from "../home/home";
import { Registration4Page } from '../registration4/registration4';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-registration-3',
  templateUrl: 'registration-3.html'
})
export class Registration3Page {

  user: UserModel = new UserModel();
  avatar: string;
  rootPage = HomePage;
  showNauticalWorkText: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {
    this.user = navParams.data.user ? navParams.data.user : this.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration3Page');
  }

  save(user) {
    this.userProvider.create(user)
    .subscribe(user_params => {
      this.user = new UserModel(user_params);
      this.presentToast("Usuário cadastrado com sucesso!");
      this.move_to_photopage(this.user);
    }, error => {
        console.log(error.json().errors);
        var errors = error.json().errors;
        var errorMessage;
        for(let campo in errors) {
           for(let campos of errors[campo]){
             errorMessage += "Erro no campo " + campo + ": " + campos + " \n";
           }
        }
        this.presentToast(errorMessage);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

  openPage(page){
    this.navCtrl.push(page);
  }

  move_to_photopage(user: UserModel) {
    this.navCtrl.push(Registration4Page, { user: user });
  }

  hideNautical(){
    this.showNauticalWorkText = !this.showNauticalWorkText;
  }

}
