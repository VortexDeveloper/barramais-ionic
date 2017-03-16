import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Conversations } from '../../providers/conversations';
import { MessagesPage } from '../messages/messages';

/*
  Generated class for the Conversation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'conversation.html'
})
export class ConversationPage {
  public conversations: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public conversationsProvider: Conversations
  ) {
    this.loadConversations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }

  loadConversations() {
    this.conversationsProvider.my_conversations().subscribe(
      (conversations) => this.conversations = conversations,
      (error) => console.log(error),
      () => console.log("completed")
    );
  }

  openConversation(conversation) {
    this.navCtrl.push(MessagesPage, {conversation: conversation});
  }
}
