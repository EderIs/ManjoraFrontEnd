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
  
  empleado: Empleado[] = [];
  constructor(private empleadoService: EmpleadoService) { }
  


  ngOnInit(): void {
    this.cargarContactos();
  }
  cargarContactos(): void{
    this.empleadoService.lista().subscribe(
      data => {
        this.empleado = data;
      },
      err =>{
        console.log(err);
      }
    )
  }

}