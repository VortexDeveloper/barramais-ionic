import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostModalPage } from "../post-modal/post-modal";
import { UserPage } from '../user/user';
import { FeedsPage } from '../feeds/feeds';
import { GroupsPage } from '../groups/groups';
import { EventsPage } from '../events/events';
import { FriendsPage } from '../friends/friends';
import { UserModel } from "../../models/user.model";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../providers/user';
import { Conversations } from '../../providers/conversations';
import { MessagesPage } from '../messages/messages';
import { Posts } from '../../providers/posts';
import { Camera } from '@ionic-native/camera';
import { ActionSheetController }  from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { Platform, LoadingController }  from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AlbumListPage } from '../album-list/album-list';

declare var cordova: any;

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user_token: any = localStorage.getItem('user');
  jwtHelper: JwtHelper = new JwtHelper();
  user: UserModel = new UserModel();
  userPage: any = UserPage;
  profilePage: any = ProfilePage;
  feedsPage: any = FeedsPage;
  groupsPage: any = GroupsPage;
  eventsPage: any = EventsPage;
  friendsPage: any = FriendsPage;
  friends: any;
  friendsCount: number;
  profileInformation: boolean = false;
  visitorActions: boolean = false;
  current_user: UserModel = new UserModel();
  isFriend: any;
  posts: Array<any>;
  nautical_sports: any[] = [];
  erro: string = "";
  albumListPage: any = AlbumListPage;
  personalInformation: boolean = false;
  socialsInformation: boolean = false;
  sportsInformation: boolean = false;
  embarcationInformation: boolean = false;
  nauticalInformation: boolean = false;


  constructor(
    public navCtrl: NavController,
    params: NavParams,
    private userProvider: User,
    public conversationProvider: Conversations,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public postsProvider: Posts,
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private camera: Camera
  ) {
    this.current_user = new UserModel(this.jwtHelper.decodeToken(this.user_token));
    this.setUser(params.data.user);
    this.getUserNauticalSports();
    if (this.current_user.id == this.user.id){
      events.subscribe('onUpdateUser', (user) => { this.user = new UserModel(user) });
    }
  }

  ionViewDidLoad() {
  }

  getUserNauticalSports(){
    this.userProvider.get_nautical_sports_by_user(this.user.id)
      .subscribe(response =>{
        this.nautical_sports = response;
        console.log(response);
      }, error => {
        console.log("Erro ao exibir os esportes nauticos do usuário do usuário" + error.json());
      });
  }

  openPage(page) {
    this.navCtrl.push(page, {user: this.user});
  }

  openRoot(page){
    this.navCtrl.setRoot(page, {user: this.user});
  }

  openProfile(user_id) {
    this.navCtrl.push(this.profilePage, {user: user_id})
  }

  openFriends(){
    this.navCtrl.push(this.friendsPage, {user: this.user});
  }

  openModal() {
    let domain = {
      domain: 'profiles',
      domain_id: this.user.id
    };
    let modal = this.modalCtrl.create(PostModalPage, {'domain_config': domain});
    modal.onDidDismiss(newPost => {
      if(newPost) this.posts.unshift(newPost);
    });
    modal.present();
  }

  loadFriends(user) {
    this.userProvider.user_friends(user)
    .subscribe(
      (friends) => {
        this.friends = friends;
        this.friendsCount = friends.length;
      },
      (error) => console.log(error)
    );
  }

  createConversationWith(user) {
    this.conversationProvider.create(user).subscribe(
      (conversation) => {
        this.navCtrl.push(MessagesPage, { conversation: conversation });
      },
      (error) => console.log(error)
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  unfriend(user){
    this.userProvider.unfriend(user)
    .subscribe(
      (response) =>{
        this.presentToast(response.status);
        this.isFriend = false;
      },
      (error) => {
        console.log(error.json());
      }
    );
  }

  presentConfirmUnfriend(user) {
    let alert = this.alertCtrl.create({
      title: 'Desfazer amizade',
      message: 'Tem certeza que deseja desfazer amizade com ' + this.user.first_name + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.unfriend(user);
          }
        }
      ]
    });
    alert.present();
  }


  accept_friendship(user){
    this.userProvider.accept_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response);
      },
      (error) => console.log(error)
    );
  }

  refuse_friendship(user){
    this.userProvider.refuse_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
      },
      (error) => console.log(error)
    );
  }

  request_friendship(user){
    this.userProvider.request_friendship(user)
    .subscribe(
      (response) => {
        this.presentToast(response.status);
        this.isFriend = "waiting";
      },
      (error) => console.log(error)
    );
  }

  is_friend_of(user){
    this.userProvider.is_friend_of(user)
    .subscribe(
      (response) => {
        this.isFriend = response;
      },
      (error) => console.log(error)
    );
  }

  loadPosts() {
    let domain_config = {
      domain: 'profiles',
      domain_id: this.user.id
    };
    let loader = this.loadingCtrl.create({
      content: "Carregando Feed..."
    });

    loader.present();

    this.postsProvider.posts_with_domain(domain_config).subscribe(
      (posts) => {
        this.posts = posts;
        loader.dismiss();
      },
      (error) => {
        console.log(error);
        loader.dismiss();
      }
    );
  }

  setUser(user_id){
    if(!user_id){
      this.user = this.current_user;
      this.loadPosts();
    } else {
      this.userProvider.getUser(user_id)
      .subscribe(
        (user) => {
          this.user = new UserModel(user);
          this.checkUser();
          this.loadFriends(user);
          user.id == this.current_user.id? this.isFriend = null : this.is_friend_of(user);
          this.loadPosts();
        },
        (error) => console.log(error)
      );
    }
  }

  checkUser(){
    if(this.user.id == this.current_user.id){
        this.visitorActions = false;
    }else{
        this.visitorActions = true;
    }
  }

  createComment(post, comment) {
    this.postsProvider.comment(post, comment).subscribe(
      (comment) => {
        post.new_comment_body = "";
        post.comments.push(comment);
      },
      (error) => console.log(error)
    );
  }

  openMediaOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Carregar midia',
      cssClass: 'page-post-modal',
      buttons: [
        {
          text: 'Carregar da Galeria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Fotos',
          icon: !this.platform.is('ios') ? 'videocam' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            console.log('Play clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      allowEdit: true
    };

    this.camera.getPicture(options).then(
      image_url => {
        let includeToNewMedia = (image) => {
          this.user.cover_photo = 'data:image/jpeg;base64,' + image;
          this.save_cover_photo();
        };

        includeToNewMedia(image_url);
      },
      error => {
        this.erro = error;
      }
    );
  }

  save_cover_photo() {
    let loader = this.loadingCtrl.create({
      content: "Salvando seus dados, aguarde..."
    });

    loader.present();

    this.userProvider.save_cover_photo(this.user)
    .subscribe((user_params) => {
        this.current_user = new UserModel(this.jwtHelper.decodeToken(user_params.user));
        this.user = new UserModel(this.jwtHelper.decodeToken(user_params.user));
        loader.dismiss();
    }, error => {
        alert(error.json());
        console.log(JSON.stringify(error.json()));
    });
  }

  doRefresh(refresher) {
    this.loadPosts();
    refresher.complete();
  }

  showProfileInformation(){
    if(this.profileInformation){
      this.nauticalInformation = false;
      this.embarcationInformation = false;
      this.sportsInformation = false;
      this.socialsInformation = false;
      this.personalInformation = false;
    }
    this.profileInformation = !this.profileInformation;
  }

  showNauticalInformation(){
    this.nauticalInformation = !this.nauticalInformation;
  }

  showEmbarcationInformation(){
    this.embarcationInformation = !this.embarcationInformation;
  }

  showSportsInformation(){
    this.sportsInformation = !this.sportsInformation;
  }

  showSocialsInformation(){
    this.socialsInformation = !this.socialsInformation;
  }

  showPersonalInformation(){
    this.personalInformation = !this.personalInformation;
  }

}
