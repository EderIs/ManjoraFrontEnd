import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaisService } from '../../../service/pais.service';
import { Pais } from '../../../models/pais';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'lista-pais.component.html'
})

export class ListaPaisComponent implements OnInit, OnDestroy {

  paises: Pais[] = [];
  dtTrigger = new Subject();

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit() {
    this.paisService.lista().subscribe(paises => {
      this.paises = paises;
      this.dtTrigger.next();
    });
    this.paisService.lista().subscribe();
  }

  delete(id: number) {
    try {
      this.paisService.delete(id).subscribe(res => {
        this.paises = this.paises.filter(pais => pais.id !== res.id);
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
