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

  puestos: Puesto[];
  dtTrigger = new Subject();


  constructor(private puestoService: PuestoService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

    this.puestoService.Puestos.subscribe(puestos => {
      this.puestos = puestos;
      this.dtTrigger.next();

    })

    //if (this.puestos != null) {
    this.puestoService.fetchPuestos().subscribe();
    // }else{
    //   this.cargarPuestos()
    // }
  }


  cargarPuestos() {
    this.puestoService.fetchPuestos().subscribe(model => {
      this.puestos = model;
      console.log(model)
    }, err => {
      console.log(err.error.mensaje);
    });
  }

  delete(id: number) {
    if (id > 0) {
      this.puestoService.delete(id).subscribe(res => {
        this.puestos = this.puestos?.filter(Puesto => Puesto.id !== res.id);
        alert("se elimino registro con exito");
        this.route.navigate(['empleado/puesto/listarPuesto']);
      })
    } else {
      alert("no se pudo eliminar");
    }

  }


  ngOnDestroy() {
    this.dtTrigger.unsubscribe()
  }
}

