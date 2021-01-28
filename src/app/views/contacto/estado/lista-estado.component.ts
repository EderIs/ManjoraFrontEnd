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

  buscarEstadoNombre(event: Event): void {
   const filtro = (event.target as HTMLInputElement).value;
   this.estadoService.detailName(filtro).subscribe(
    data => {
      this.estados = null;
      this.estados[0] = data;
    },
    err => {
      console.log(err);
    }
   );
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