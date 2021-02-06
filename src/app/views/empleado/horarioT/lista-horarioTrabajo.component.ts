import { Component, OnInit } from '@angular/core';
import  {PaisService} from '../../../service/pais.service';
import { HorarioTrabajo } from '../../../models/horarioTrabajo';
import { HorarioTrapService } from '../../../service/horario-trap.service';
@Component({
  templateUrl: 'lista-horarioTrabajo.component.html'
})

export class ListaHorarioTrabajoComponent implements OnInit{
  busqueda: string="";
  horarios : HorarioTrabajo[]= [];

  constructor(private horarioService : HorarioTrapService){}

  ngOnInit(): void {
      this.cargarHorario();    
  }
  cargarHorario(): void{
    this.horarioService.lista().subscribe(
      data => {
        this.horarios = data;
      },
      err =>{
        console.log(err);
      }
    )
  }

  onSearch(){
    if(this.busqueda != " "){
      this.horarioService.listaByNombre(this.busqueda).subscribe(model=>{
      this.horarios=model;
      },err=>{
        alert('No existen Horas');
      })
    }else{
      alert('No se realizo la busqueda correctamente');
    }
  }

borrar(id:number){

if(id > 0){

  this.horarioService.delete(id).subscribe(model=>{
alert('Se elimino el registro');
this.cargarHorario();

  },err=>{

alert("No se pudo eliminar Pais");
console.log(err.error.mensaje);

  })

}else{
alert('no hay numero');
}


}

}