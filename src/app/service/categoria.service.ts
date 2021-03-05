import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Categoria}  from '../models/categoria';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService{

    categoriaURL = 'http://localhost:8090/categorias/'
constructor(private httpClient : HttpClient){

}


public getCategorias(idUser : number): Observable<Categoria[]>{

return this.httpClient.get<Categoria []>(this.categoriaURL+"getCategorias/"+idUser);

}

public saveCategorias(categoria : Categoria):Observable<any>{
  return this.httpClient.post(this.categoriaURL+"create",categoria);
}



}