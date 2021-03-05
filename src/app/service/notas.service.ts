import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notas } from '../models/notas';

@Injectable({
    providedIn: 'root'
})

export class NotasService {

    notasURL = 'http://localhost:8090/notas/'

    constructor(private httpClient: HttpClient) {

    }

    public save(notas: Notas): Observable<any> {
        return this.httpClient.post<any>(this.notasURL + "save", notas);
    }

    public updateNotas(idNotas: Number, notas: Notas): Observable<any> {
        return this.httpClient.put(this.notasURL + "updateNotas/" + idNotas, notas);
    }

    public listNotas(idNotas: Number): Observable<Notas[]> {
        return this.httpClient.get<Notas[]>(this.notasURL + "listNotas/" + idNotas);
    }

    public getNotas(idNotas: Number): Observable<Notas> {
        return this.httpClient.get<Notas>(this.notasURL + "getNotas/" + idNotas);
    }

}