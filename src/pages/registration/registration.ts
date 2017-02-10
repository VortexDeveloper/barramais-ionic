import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserModel } from "../../models/user.model";
import { MainPage } from "../main/main";
import { User } from '../../providers/user';
import { ToastController } from 'ionic-angular';
import { FeedsPage } from "../feeds/feeds";
/*
  Generated class for the Registration1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {

  user: UserModel = new UserModel();
  rootPage = MainPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider: User,
    public toastCtrl: ToastController
  ) {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  save(user) {
    this.userProvider.create(user)
    .subscribe(user_params => {
        this.user = new UserModel(user_params);
        console.log(user);
        this.login(user);
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

  login(user) {
    this.userProvider.login(user)
    .subscribe(token_params => {
        localStorage.setItem("jwt", token_params.token);
        localStorage.setItem("user", token_params.user);
        this.openPage(MainPage);
        this.presentToast("Usuário cadastrado com sucesso, complete o cadastro do seu perfil.");
    }, error => {
        console.log(error.json() || 'Server error');
        this.presentToast(error.json().error);
    });
  }

}
