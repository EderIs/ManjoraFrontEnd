import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Proyecto } from '../../models/proyecto';
import { ProyectoService } from '../../service/proyecto.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-proyecto',
  templateUrl: 'lista-proyecto.component.html'
})

export class ListaProyectoComponent implements OnInit {

  contador: Number[] = [];
  proyectos: Proyecto[] = [];
  proyecto: Proyecto = new Proyecto("Nuevo Proyecto", null);
  idUsuario: number = parseInt(window.sessionStorage.getItem("ValueUs"));
  @ViewChild('largeModal') public largeModal: ModalDirective;

  constructor(private proyectoService: ProyectoService,
    private router : Router) {}

  ngOnInit(): void {

    this.proyectoService.listProyectos(this.idUsuario).subscribe(model => {

      this.proyectos = model;

    }, err => {
      console.log("No existen proyectos creados");
    });
  }

  navigate(idP : number){

    //alert(idP);
    this.router.navigate(['/proyecto/etapa/'+idP]);

  }
  onCreate() {

    let usuario = new Usuario("Yo", "", "", "", null, null, true, "");
    usuario.id = this.idUsuario;

    this.proyecto.usuario = usuario;
    this.proyectoService.save(this.proyecto).subscribe(model => {
      alert("Se guardo el proyecto");
      this.proyectos.push(model);
      this.largeModal.hide();
    }, err => {
      alert("No se pudo insertar");
    });

  }

}