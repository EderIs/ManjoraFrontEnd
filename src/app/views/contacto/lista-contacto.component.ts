import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Contacto } from '../../models/contacto';
import { ContactoService } from '../../service/contacto.service';

@Component({
  selector: 'app-lista-contacto',
  templateUrl: 'lista-contacto.component.html',
  styleUrls: ['nuevoeditar-contacto.component.scss'],
})

export class listaContactoComponent implements OnInit, OnDestroy {

  unsubcription: Subscription;
  listDesSuscrib: Subscription[] = [];
  contactos: Contacto[] = [];
  dtTrigger = new Subject();


  constructor(
    private contactoService: ContactoService
  ) { }


  ngOnInit() {
    this.cargarUsuarios();
  }


  cargarUsuarios(): void {

    this.unsubcription = this.contactoService.lista().subscribe(model => {

      this.contactos = model;
      this.dtTrigger.next();

    }, err => {

    });
    this.listDestruct(this.unsubcription);

  }




  delete(id: number): void {
    this.unsubcription = this.contactoService.delete(id).subscribe(res => {
      this.contactos = this.contactos.filter(contacto => contacto.id !== res.id);

      alert("Usuario eliminado");
      this.dtTrigger.unsubscribe();
      this.cargarUsuarios();

    }, err => {
      console.log(err.error.mensaje);
    });

    this.listDestruct(this.unsubcription);

  }


  ngOnDestroy() {
    this.dtTrigger.unsubscribe()

    if (this.listDesSuscrib.length > 0) {

      this.listDesSuscrib.forEach(subs => {
        subs.unsubscribe();
      });
    }


  }

  listDestruct(suscripcion) {
    if (suscripcion != null) {
      this.listDesSuscrib.push(suscripcion);
    }
  }


}
















