import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HoraLaboral} from '../models/horaLaboral';

@Injectable({
  providedIn: 'root'
})
export class HorarioLabService {
  horaLabURL = 'http://localhost:8090/horaL/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable < HoraLaboral[]> {
    return this.HttpClient.get< HoraLaboral[]>(this. horaLabURL + 'list');
  }

  public listaByNombre(nombreHoraL:string):Observable<HoraLaboral[]>{
    return this.HttpClient.get<HoraLaboral[]>(this.horaLabURL+`list/${nombreHoraL}`);
    }

  public detail(id: number): Observable < HoraLaboral> {
    return this.HttpClient.get< HoraLaboral>(this. horaLabURL + `detail/${id}`);
  }

  public detailName(nombreHoraL: string): Observable < HoraLaboral> {
    return this.HttpClient.get< HoraLaboral>(this. horaLabURL + `detail/${nombreHoraL}`);
  }

  public save(horaLab:  HoraLaboral): Observable<any> {
    return this.HttpClient.post<any>(this. horaLabURL + 'create', horaLab);
  }

  public update(id: number, horaLab:  HoraLaboral): Observable<any> {
    return this.HttpClient.put<any>(this. horaLabURL + `update/${id}`, horaLab);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this. horaLabURL + `delete/${id}`);
  }
}
