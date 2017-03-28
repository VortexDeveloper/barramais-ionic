import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as ActionCable from 'actioncable';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

/*
  Generated class for the ConversationChannel provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConversationChannel {
  public conversationChannel: any;
  public subscription: any;
  // public host_cable: string = 'http://1.0.2.2:3000/cable/?jwt=';
  // public host_cable: string = 'http://localhost:3000/cable/?jwt=';
  public host_cable: string = 'http://barramais.herokuapp.com/cable/?jwt=';

  constructor(
    public http: Http,
    public events: Events
  ) {
    this.conversationChannel = ActionCable.createConsumer(this.host_cable+localStorage.getItem('jwt'));

    var subscription = this.conversationChannel.subscriptions.create('ConversationChannel', {
      connected: function() {},
      disconnected: function() {},
      received: function(data) {
        events.publish('onCreatedMessage', data);
      },

      speak: function(data) {
        this.perform('speak', data);
      }
    });
    this.subscription = subscription;
  }

  createMessage(message_data) {
    this.subscription.speak(message_data);
  }
}
