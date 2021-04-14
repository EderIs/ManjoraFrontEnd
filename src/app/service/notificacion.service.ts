import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/Notificacion';

@Injectable({
  providedIn: 'root'
})

export class NotificacionService{
    

    notificacionUrl ='http://localhost:8090/notificacion';

    constructor(private httpClient: HttpClient) {

    }


    public updateNotificacion(id : number, notificacion : Notificacion ):Observable<any>{
        return this.httpClient.get<any>(this.notificacionUrl+"/NotEstatus/"+id);
    }

    getNotifications(idUser:Number):Observable<Notificacion[]>{
        return this.httpClient.get<Notificacion[]>(this.notificacionUrl+"/listNot/"+idUser);
      }

}