import { Component, OnInit } from '@angular/core';
import { HoraLaboral } from '../../../models/horaLaboral';
import { HorarioLabService } from '../../../service/horario-lab.service';
@Component({
  templateUrl: 'lista-horasL.component.html'
})

export class ListaHorasLComponent implements OnInit{
  horasLab: HoraLaboral[] = [];
  busqueda: string="";
  
  constructor(
    private horaLabService: HorarioLabService
    ) { }

  ngOnInit(): void {
    this.cargarHorasLab();
  }

  cargarHorasLab(): void {
    this.horaLabService.lista().subscribe(
      data => {
        this.horasLab = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSearch(){
    if(this.busqueda != " "){
      this.horaLabService.listaByNombre(this.busqueda).subscribe(model=>{
      this.horasLab=model;
      },err=>{
        alert('No existen Horas');
      })
    }else{
      alert('No se realizo la busqueda correctamente');
    }
  }


  borrar(id: number) {
    this.horaLabService.delete(id).subscribe(
      data => {
       console.log(data);
        this.cargarHorasLab();
      },
      err => {
        console.log(err)
      }
    );
  }

}