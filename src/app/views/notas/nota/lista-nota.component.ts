import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Actividad } from '../../../models/actividad';
import { Etapa } from '../../../models/Etapa';
import { Proyecto } from '../../../models/proyecto';
import { Nota } from '../../../models/nota';
import { Usuario } from '../../../models/usuario';
import { ActividadService } from '../../../service/actividad.service';
import { NotaService } from '../../../service/nota.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-lista-nota',
  templateUrl: 'lista-nota.component.html',
  styleUrls: ['lista-nota.scss']
})

export class ListaNotaComponent implements OnInit {

  @ViewChild('myModal') public mymodal: ModalDirective;
  @ViewChild('myModalA') public myModalA: ModalDirective;
  actividadRes: Actividad[] = [];
  historialAct: Actividad[] = [];
  nota: Nota = new Nota("",
    new Usuario("", "", "", "", null, null, null, ""), null, null, null, null);
  usuarios: Usuario[] = []
  idUsuario: number;
  idUsuario2: number;
  actividad: Actividad = new Actividad("", "", new Date(), null, new Usuario("", "", "", "", null, null, null, ""), null);
  idNota: number = this.activatedRoute.snapshot.params.id;

  constructor(private activatedRoute: ActivatedRoute,
    private notaService: NotaService,
    private actividadService: ActividadService,
    private UsuarioService: UsuarioService) { }

  ngOnInit() {

    if (this.idNota > 0) {

      this.notaService.getNotasByIdNota(this.idNota).subscribe(model => {

        this.nota = model;
        this.idUsuario = this.nota.usuario.id;
       /*  if (this.nota != null) {
          this.actividadService.getActividadBy(this.tarea.id).subscribe(
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
        } */
      });
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

    this.UsuarioService.listUsuarios().subscribe(model => {
      this.usuarios = model
    });
  }

  onCreate() {

    if (this.nota.fechaFinal >= this.nota.fechaInicio) {
      this.nota.usuario.id = this.idUsuario;
      this.nota.fechaFinal = new Date(this.nota.fechaFinal.toString().replace('-', '/'));
      this.notaService.updateNota(this.nota.id, this.nota).subscribe(model => {


        this.notaService.getNotasByIdNota(this.idNota).subscribe(model => {
          this.nota = model;
          this.idUsuario = this.nota.usuario.id;
        });
        this.mymodal.hide();
        alert(model.mensaje);
      });
    } else {
      alert("No se puede guardar una fecha anterior al inicio");
    }


  }

 /*  onCreate2() {
    
    if(this.actividad !=null){

      let valores = this.idUsuario2.toString().split('-');

      this.actividad.usuario.id = parseInt(valores[0]);
      this.actividad.usuario.email = valores[1];
      this.actividad.usuario.nombre = valores[2];
      this.actividad.tarea = this.tarea;
      this.actividad.fechaFinal = new Date(this.actividad.fechaFinal.toString().replace('-', '/'));
      this.actividadService.saveActividad(this.actividad).subscribe(model =>{

        console.log(model);

        if(model.estadoT)
        this.historialAct.push(model);
        else
        this.actividadRes.push(model);

        this.actividad = new Actividad("", "", 
        new Date(), null, new Usuario("", "", "", "", null, null, null, ""), null);
        this.myModalA.hide();
      });
    }


  } */

  moverRealizado(actividadM: Actividad){

    if(actividadM!=null){
     
      actividadM.estadoT=true;

      this.actividadService.updateActividad(actividadM.id,actividadM).subscribe(model=>{

        let a = this.actividadRes.findIndex(a => a.id == actividadM.id && a.actividad == actividadM.actividad);
    
        this.actividadRes.splice(a,1);
   
        this.historialAct.push(model);
      }, err=>{
             alert(err.error.mensaje);
      });
    }

  }

  borrarActividad(idActividad){

  this.actividadService.deleteActividad(idActividad).subscribe(model => 
    {
      let a = this.actividadRes.findIndex(a => a.id == idActividad);
    
      this.actividadRes.splice(a,1);
    }, err =>{
      alert(err.error.mensaje);
    });
    
  }

}
