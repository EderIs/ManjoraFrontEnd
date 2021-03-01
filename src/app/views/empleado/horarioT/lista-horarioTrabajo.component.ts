import { Component, OnInit } from '@angular/core';
import  {PaisService} from '../../../service/pais.service';
import { HorarioTrabajo } from '../../../models/horarioTrabajo';
import { HorarioTrapService } from '../../../service/horario-trap.service';
@Component({
  templateUrl: 'lista-horarioTrabajo.component.html'
})

export class ListaHorarioTrabajoComponent implements OnInit{
  horasTrab: HorarioTrabajo[] = [];
  busqueda: string="";
  
  constructor(
    private horaTabService: HorarioTrapService
    ) { }

  ngOnInit(): void {
    this.cargarHorasTrab();
  }

  cargarHorasTrab(): void {
    this.horaTabService.lista().subscribe(
      data => {
        this.horasTrab = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSearch(){
    if(this.busqueda != " "){
      this.horaTabService.listaByNombre(this.busqueda).subscribe(model=>{
      this.horasTrab=model;
      },err=>{
        alert('No existen Horas');
      })
    }else{
      alert('No se realizo la busqueda correctamente');
    }
  }


  borrar(id: number) {
    this.horaTabService.delete(id).subscribe(
      data => {
       console.log(data);
        this.cargarHorasTrab();
      },
      err => {
        console.log(err)
      }
    );
  }

}