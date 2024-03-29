import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  empleadoURL = 'http://localhost:8090/empleado/'

  constructor(private HttpClient: HttpClient) { }

  public lista(): Observable <Empleado[]> {
    return this.HttpClient.get<Empleado[]>(this.empleadoURL + 'list');
  }

  public listaByNombre(nombreEmpleado:string):Observable<Empleado[]>{
    return this.HttpClient.get<Empleado[]>(this.empleadoURL+`list/${nombreEmpleado}`);
  }

  public detail(id: number): Observable <Empleado> {
    return this.HttpClient.get<Empleado>(this.empleadoURL + `detail/${id}`);
  }

  public detailName(nombreEmpleado: string): Observable <Empleado> {
    return this.HttpClient.get<Empleado>(this.empleadoURL + `detail/${nombreEmpleado}`);
  }

  public save(empleado: Empleado): Observable<any> {
    return this.HttpClient.post<any>(this.empleadoURL + 'create', empleado);
  }

  public upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.HttpClient.post<any>(this.empleadoURL + 'upload', formData);
  }

  public update(id: number, empleado: Empleado): Observable<any> {
    return this.HttpClient.put<any>(this.empleadoURL + `update/${id}`, empleado);
  }

  public delete(id: number): Observable<any> {
    return this.HttpClient.delete<any>(this.empleadoURL + `delete/${id}`);
  }
}
