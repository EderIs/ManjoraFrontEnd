import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/Notificacion';
import { OutputsService } from './outputs.service';
declare var Stomp;
declare var SockJS;

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService{

    public stompClient;
    notificacion : Notificacion ;

constructor(private ouput: OutputsService
  ,private HttpClient: HttpClient){
}

initializeWebSocketConnection () { 
    const serverUrl = 'http://localhost:8090/ws'; 
    const ws = new SockJS (serverUrl); 
    this.stompClient = Stomp.over(ws); 
    const that = this; 

    this.stompClient.connect({}, function (frame) { 
      that.stompClient.subscribe('/message', (message) => {  
        if (message.body) { 
       that.notificacion =JSON.parse(message.body);
       that.ouput.disparadorNot.emit(that.notificacion);     
        } 
      }); 
    }); 
  } 
  
sendMessage (notificacion : Notificacion) { 
    this.stompClient.send('/app/send/message',{}, JSON.stringify(notificacion)); 
  }

}