import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { Actividad } from '../../../models/actividad';
import { Etapa } from '../../../models/Etapa';
import { Notificacion } from '../../../models/Notificacion';
import { Proyecto } from '../../../models/proyecto';
import { Tarea } from '../../../models/tarea';
import { Usuario } from '../../../models/usuario';
import { ActividadService } from '../../../service/actividad.service';
import { TareaService } from '../../../service/tarea.service';
import { UsuarioService } from '../../../service/usuario.service';
import { WebSocketsService } from '../../../service/webSockets.service';

@Component({
  selector: 'app-lista-tarea',
  templateUrl: 'lista-tarea.component.html',
  styleUrls: ['lista-tarea.scss']
})

export class ListaTareaComponent implements OnInit, OnDestroy {

  @ViewChild('myModal') public mymodal: ModalDirective;
  @ViewChild('myModalA') public myModalA: ModalDirective;
  actividadRes: Actividad[] = [];
  historialAct: Actividad[] = [];
  etapas : Etapa[]=[];
  tarea: Tarea = new Tarea("",
    new Usuario("", "", "", "", null, null, null, ""), null, null, null, null);
  usuarios: Usuario[] = []
  idUsuario: number;
  idUsuario2: number;
  notificacion: Notificacion = new Notificacion(0,"","","",null,true,"");
  actividad: Actividad = new Actividad("", "", new Date(), null, new Usuario("", "", "", "", null, null, null, ""), null);
  idTarea: number = this.activatedRoute.snapshot.params.id;
  subscripciones : Subscription []= [];

  constructor(private activatedRoute: ActivatedRoute,
    private tareaService: TareaService,
    private actividadService: ActividadService,
    private UsuarioService: UsuarioService,
    private webSocketsService : WebSocketsService
    ) { }
 

  ngOnInit() {

    if (this.idTarea > 0) {

     let tareaSub = this.tareaService.getTareasByIdTarea(this.idTarea).subscribe(model => {

        this.tarea = model;
        this.idUsuario = this.tarea.usuario.id;
        if (this.tarea != null) {
          this.actividadService.getActividadByTarea(this.tarea.id).subscribe(
            model => {
              model.forEach(actividad => {

                if (actividad.estadoT)
                  this.historialAct.push(actividad);
                else
                  this.actividadRes.push(actividad);
              });
            }
          );
          this.cargarUsuarios();
        }
      });
      this.subscripciones.push(tareaSub);
    }
    
  }

  ngOnDestroy(): void {
    if(this.subscripciones.length > 0){
      this.subscripciones.forEach(susb =>{
          susb.unsubscribe;
      })
    }
  }
  openModalEditar() {
    this.mymodal.show();
  }

  OpenModalActividad() {

    this.cargarUsuarios();
    this.myModalA.show();
  }

  cambiarRealizado(event) {
    let valor = event.target.id;
    this.actividad.estadoT = (valor == 0) ? false : true;
  }

  cargarUsuarios() {

    let usuarios =this.UsuarioService.listUsuarios().subscribe(model => {
      this.usuarios = model
    });
    this.subscripciones.push(usuarios);
  }

  onCreate() {

    if (this.tarea.fechaFinal >= this.tarea.fechaInicio || this.tarea.usuario.id < 1) {
      this.tarea.usuario.id = this.idUsuario;
      this.tarea.fechaFinal = new Date(this.tarea.fechaFinal.toString().replace('-', '/'));
      let tareaSave = this.tareaService.updateTarea(this.tarea.id, this.tarea).subscribe(model => {

        let tareas =this.tareaService.getTareasByIdTarea(this.idTarea).subscribe(model => {
          this.tarea = model;
          this.idUsuario = this.tarea.usuario.id;
        });
        this.mymodal.hide();
        alert(model.mensaje);
        this.subscripciones.push(tareas);
      }, err=>{
        alert(err.error.mensaje);
      });
      this.subscripciones.push(tareaSave);
    } else {
      alert("Ocurrio un problema al guardar");
    }


  }

  onCreate2() {
    
    if(this.actividad !=null){

      let valores = this.idUsuario2.toString().split('-');

      this.actividad.usuario.id = parseInt(valores[0]);
      this.actividad.usuario.email = valores[1];
      this.actividad.usuario.nombre = valores[2];
      this.actividad.tarea = this.tarea;
      this.actividad.fechaFinal = new Date(this.actividad.fechaFinal.toString().replace('-', '/'));
     let actividadS = this.actividadService.saveActividad(this.actividad).subscribe(model =>{

        console.log(model);

        if(model.estadoT)
        this.historialAct.push(model);
        else
        this.actividadRes.push(model);
        this.mandarNotificacion(model);
        this.actividad = new Actividad("", "", 
        new Date(), null, new Usuario("", "", "", "", null, null, null, ""), null);
        this.myModalA.hide();
      });
      this.subscripciones.push(actividadS);
    }
  }

  mandarNotificacion(actividad: Actividad){
    this.notificacion.titulo="Te han asignado una actividad: "+actividad.actividad;
    this.notificacion.usuarioDestino = actividad.usuario;
    this.notificacion.resumen="La fecha de entrega: "+actividad.fechaFinal;
    this.notificacion.ruta ="proyecto/tarea/"+actividad.tarea.id;
    this.webSocketsService.sendMessage(this.notificacion);
}

  moverRealizado(actividadM: Actividad){

    if(actividadM!=null){
     
      actividadM.estadoT=true;

      let actvidadS = this.actividadService.updateActividad(actividadM.id,actividadM).subscribe(model=>{

        let a = this.actividadRes.findIndex(a => a.id == actividadM.id && a.actividad == actividadM.actividad);
    
        this.actividadRes.splice(a,1);
   
        this.historialAct.push(model);
      }, err=>{
             alert(err.error.mensaje);
      });
    this.subscripciones.push(actvidadS);
    }

  }

  borrarActividad(idActividad){

  let borrarA = this.actividadService.deleteActividad(idActividad).subscribe(model => 
    {
      let a = this.actividadRes.findIndex(a => a.id == idActividad);
    
      this.actividadRes.splice(a,1);
    }, err =>{
      alert(err.error.mensaje);
    });
    
    this.subscripciones.push(borrarA);
  }


}
