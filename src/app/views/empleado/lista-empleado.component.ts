import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { EmpleadoService } from '../../service/empleado.service';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-lista-contacto',
  templateUrl: 'Lista-empleado.component.html'
})

export class ListaEmpleadoComponent implements OnInit{
  busqueda: string="";
  empleados : Empleado[]= [];

  constructor(private empleadoService : EmpleadoService){}

  ngOnInit(): void {
      this.cargarHorario();    
  }
  cargarHorario(): void{
    this.empleadoService.lista().subscribe(
      data => {
        this.empleados = data;
      },
      err =>{
        console.log(err);
      }
    )
  }

  onSearch(){
    if(this.busqueda != " "){
      this.empleadoService.listaByNombre(this.busqueda).subscribe(model=>{
      this.empleados=model;
      },err=>{
        alert('No existen Horas');
      })
    }else{
      alert('No se realizo la busqueda correctamente');
    }
  }

borrar(id:number){

if(id > 0){

  this.empleadoService.delete(id).subscribe(model=>{
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