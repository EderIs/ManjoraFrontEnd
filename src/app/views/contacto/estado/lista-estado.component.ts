import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Estado } from '../../../models/estado';
import { EstadoService } from '../../../service/estado.service';

@Component({
  templateUrl: 'lista-estado.component.html'
})

export class ListaEstadoComponent implements OnInit{
  estados: Estado[] = [];
  estado: Estado = null;
  busqueda: string="";
  
  constructor(
    private estadoService: EstadoService
    ) { }

  ngOnInit(): void {
    this.cargarEstados();
  }

  cargarEstados(): void {
    this.estadoService.lista().subscribe(
      data => {
        this.estados = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSearch(){
    if(this.busqueda != " "){
      this.estadoService.listaByNombre(this.busqueda).subscribe(model=>{
      this.estados=model;
      },err=>{
        alert('No existen estados');
      })
    }else{
      alert('No se realizo la busqueda correctamente');
    }
  }


  borrar(id: number) {
    this.estadoService.delete(id).subscribe(
      data => {
       console.log(data);
        this.cargarEstados();
      },
      err => {
        console.log(err)
      }
    );
  }
}