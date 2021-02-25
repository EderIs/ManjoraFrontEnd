import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ArchivosService{

    archivoURL = "http://localhost:8090/archivo/";
    

    
    constructor(private httpClient: HttpClient) {

    }

   public saveImagen(imagen: FormData ): Observable<any>{

    return this.httpClient.post<any>(this.archivoURL+"imagen",imagen);

   }
   
   public updateImagen(pathImagen:String , imagenN : FormData):Observable<any>{

    return this.httpClient.put<any>(this.archivoURL+`updateImagen/${pathImagen}`,imagenN);

   }

   public uploadImagen(nombreImagen: String):Observable<any>{

    return this.httpClient.request("GET",
    this.archivoURL+"getImage/"+nombreImagen,{responseType: 'blob' as 'json'});

   }

   public deleteImage(nombreImagen: string):Observable<any>{
     return this.httpClient.get<any>(this.archivoURL+"deleteImage/" + nombreImagen);
   }

}