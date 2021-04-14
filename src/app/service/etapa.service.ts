import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Etapa}  from '../models/Etapa';

@Injectable({
  providedIn: 'root'
})

export class EtapaService{

    etapaURL = 'http://localhost:8090/Etapa/'

constructor(private httpClient : HttpClient){

}


public saveEtapa(etapa : Etapa):Observable<any>{
  return this.httpClient.post(this.etapaURL+"create",etapa);
}


public updateEtapa(idEtapa : number, etapa: Etapa):Observable<any>{
  return this.httpClient.put<any>(this.etapaURL+"updateE/"+idEtapa,etapa);
}

public getEtapas(idUser : number): Observable<Etapa[]>{

  return this.httpClient.get<Etapa []>(this.etapaURL+"getEtapas/"+idUser);
  
  }

}