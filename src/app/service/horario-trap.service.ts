import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HorarioTrabajo} from '../models/horarioTrabajo';

@Injectable({
  providedIn: 'root'
})
export class HorarioTrapService {

  horarioTrabURL = 'http://localhost:8090/horarioT/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <HorarioTrabajo[]> {
    return this.HttpClient.get<HorarioTrabajo[]>(this.horarioTrabURL + 'list');
  }

  public detail(id: number): Observable <HorarioTrabajo> {
    return this.HttpClient.get<HorarioTrabajo>(this.horarioTrabURL + `detail/${id}`);
  }

  public detailName(nombreHorarioTrab: string): Observable <HorarioTrabajo> {
    return this.HttpClient.get<HorarioTrabajo>(this.horarioTrabURL + `detail/${nombreHorarioTrab}`);
  }

  public save(horarioTrab: HorarioTrabajo): Observable<any> {
    return this.HttpClient.post<any>(this.horarioTrabURL + 'create', horarioTrab);
  }

  public update(id: number, horarioTrab: HorarioTrabajo): Observable<any> {
    return this.HttpClient.put<any>(this.horarioTrabURL + `update/${id}`, horarioTrab);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.horarioTrabURL + `delete/${id}`);
  }
}
