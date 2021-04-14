import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/Notificacion';

@Injectable({
  providedIn: 'root'
})

export class NotificacionService{

    archivoURL = "http://localhost:8090/archivo/";
    

    notificacionUrl ='http://localhost:8090/notificacion';

    constructor(private httpClient: HttpClient) {

    }

    getNotifications(idUser:Number):Observable<Notificacion[]>{
        return this.httpClient.get<Notificacion[]>(this.notificacionUrl+"/listNot/"+idUser);
      }

}