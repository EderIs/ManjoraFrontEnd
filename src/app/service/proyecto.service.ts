import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
    providedIn: 'root'
})

export class ProyectoService {

    proyectoURL = 'http://localhost:8090/proyecto/'

    constructor(private httpClient: HttpClient) {

    }

    public save(proyecto: Proyecto): Observable<any> {
        return this.httpClient.post<any>(this.proyectoURL + "save", proyecto);
    }

    public updateProyecto(idProyecto: Number, proyecto: Proyecto): Observable<any> {
        return this.httpClient.put(this.proyectoURL + "updateProyecto/" + idProyecto, proyecto);
    }

    public listProyectos(idUsuario: Number): Observable<Proyecto[]> {
        return this.httpClient.get<Proyecto[]>(this.proyectoURL + "listProyecto/" + idUsuario);
    }

    public getProyecto(idUProyecto: Number): Observable<Proyecto> {
        return this.httpClient.get<Proyecto>(this.proyectoURL + "getProyecto/" + idUProyecto);
    }

}