import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: 'Lista-usuario.component.html'
})

export class ListaUsuarioComponent implements OnInit , OnDestroy{

  unsubcription : Subscription;
  listDesSuscrib : Subscription [] = [];
  usuarios: Usuario[] = [];
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {
    if(this.listDesSuscrib.length > 0){

      this.listDesSuscrib.forEach(subs => {
         subs.unsubscribe();
      });
    }
   
  }

  cargarUsuarios(): void {
   this.unsubcription = this.usuarioService.lista().subscribe(model => {

      this.usuarios = model;

    }, err => {

    });
    this.listDestruct(this.unsubcription);
  }

  borrarUsuario(id: number): void {

    this.unsubcription = this.usuarioService.delete(id).subscribe(model => {
      
      alert("Usuario eliminado");
      this.cargarUsuarios();
    }, err => {
      console.log(err.error.mensaje);
    });

    this.listDestruct(this.unsubcription);
  }

  listDestruct(suscripcion){
    if(suscripcion !=null){
      this.listDesSuscrib.push(suscripcion);
    }
  }

}