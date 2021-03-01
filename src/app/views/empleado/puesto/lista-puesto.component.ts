import { Component, OnDestroy, OnInit } from '@angular/core';
import { Puesto } from '../../../models/puesto';
import { PuestoService } from '../../../service/puesto.service';
import { Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'lista-puesto.component.html',
  styleUrls: ['nuevoeditar-puesto.componente.scss'],
})

export class ListaPuestoComponent implements OnInit, OnDestroy {
  puestos: Puesto[] = [];
  dtTrigger = new Subject();


  constructor(
    private puestoService: PuestoService
    ) { }


  ngOnInit() {
      this.puestoService.fetchPuestos().subscribe(puestos => {
       this.puestos=puestos;
       this.dtTrigger.next();
     });
    this.puestoService.fetchPuestos().subscribe();
  }


  delete( id: number){
    try {
      this.puestoService.delete(id).subscribe(res => {
        this.puestos = this.puestos.filter(puesto => puesto.id !== res.id);
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

