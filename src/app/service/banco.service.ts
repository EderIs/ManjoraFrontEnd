import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Banco} from '../models/banco';

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  bancoURL = 'http://localhost:8090/banco/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <Banco[]> {
    return this.HttpClient.get<Banco[]>(this.bancoURL + 'list');
  }

  public detail(id: number): Observable <Banco> {
    return this.HttpClient.get<Banco>(this.bancoURL + `detail/${id}`);
  }

  public detailName(nombreBanco: string): Observable <Banco> {
    return this.HttpClient.get<Banco>(this.bancoURL + `detail/${nombreBanco}`);
  }

  public save(banco: Banco): Observable<any> {
    return this.HttpClient.post<any>(this.bancoURL + 'create',banco);
  }

  public update(id: number, banco: Banco): Observable<any> {
    return this.HttpClient.put<any>(this.bancoURL + `update/${id}`, banco);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.bancoURL + `delete/${id}`);
  }
}
