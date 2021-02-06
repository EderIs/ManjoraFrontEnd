import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { TituloService } from '../../../service/titulo.service';
import { Titulo } from '../../../models/titulo';

@Component({
  templateUrl: 'lista-titulo.component.html'
})

export class listaTituloComponent implements OnInit{
  titulos: Titulo[] = [];
  busqueda: string="";
  constructor(
    private tituloService: TituloService
    ) { }

  ngOnInit(): void {
    this.cargarTitulos();
  }

  cargarTitulos(): void {
    this.tituloService.lista().subscribe(
      data => {
        this.titulos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSearch(){
    if(this.busqueda != " "){
      this.tituloService.listaByTitulo(this.busqueda).subscribe(model=>{
      this.titulos=model;
      },err=>{
        alert('No existen estados');
      })
    }else{
      alert('No se realizo la busqueda correctamente');
    }
  }

  borrar(id: number) {
    this.tituloService.delete(id).subscribe(
      data => {
       console.log(data);
        this.cargarTitulos();
      },
      err => {
        console.log(err)
      }
    );
  }
}