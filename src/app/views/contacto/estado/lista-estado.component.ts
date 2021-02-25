import { Component, OnInit } from '@angular/core';
import { Estado } from '../../../models/estado';
import { EstadoService } from '../../../service/estado.service';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'lista-estado.component.html'
})

export class ListaEstadoComponent implements OnInit{

  estados: Estado[] = [];
  dtTrigger = new Subject();

  constructor(
    private estadoService: EstadoService
  ) { }

  ngOnInit() {
    this.estadoService.lista().subscribe(estados => {
      this.estados = estados;
      this.dtTrigger.next();
    });
    this.estadoService.lista().subscribe();
  }

  delete(id: number) {
    try {
      this.estadoService.delete(id).subscribe(res => {
        this.estados = this.estados.filter(estado => estado.id !== res.id);
        alert("registro borrado!!")
      });
    } catch (error) {
      alert("error al eliminar")
      console.error(error);
    }
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe()
  }
}

