import { Component, OnDestroy, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { EmpleadoService } from '../../service/empleado.service';
import { Empleado } from '../../models/empleado';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lista-contacto',
  templateUrl: 'Lista-empleado.component.html'
})

export class ListaEmpleadoComponent implements OnInit, OnDestroy{
  empleados: Empleado[] = [];
  dtTrigger = new Subject();


  constructor(
    private empleadoService: EmpleadoService
    ) { }


  ngOnInit() {
      this.empleadoService.lista().subscribe(empleados => {
       this.empleados=empleados;
       this.dtTrigger.next();
     });
    this.empleadoService.lista().subscribe();
  }


  delete( id: number){
    try {
      this.empleadoService.delete(id).subscribe(res => {
        this.empleados = this.empleados.filter(empleado => empleado.id !== res.id);
        alert("registro borrado!!")
      });
    } catch (error) {
       alert("error al eliminar")
      console.error(error);
    }
      
}
  ngOnDestroy(){
      this.dtTrigger.unsubscribe()
    }
}