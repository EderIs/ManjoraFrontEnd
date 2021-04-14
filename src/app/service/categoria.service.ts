import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Categoria}  from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService{

    categoriaURL = 'http://localhost:8090/categoria/'
constructor(private httpClient : HttpClient){

}


public getCategorias(idUser : number): Observable<Categoria[]>{

return this.httpClient.get<Categoria []>(this.categoriaURL+"getCategorias/"+idUser);

}

public saveCategorias(categoria : Categoria):Observable<any>{
  return this.httpClient.post(this.categoriaURL+"create",categoria);
}

public delete(id: number): Observable<any> {
  return this.httpClient.delete<any>(this.categoriaURL + `delete/${id}`);
}

public updateCategoria(idCategoria : number, categoria: Categoria):Observable<any>{
  return this.httpClient.put<any>(this.categoriaURL+"updateC/"+idCategoria,categoria);
}

}