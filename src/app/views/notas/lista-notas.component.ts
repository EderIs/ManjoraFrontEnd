import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Notas } from '../../models/notas';
import { NotasService } from '../../service/notas.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-notas',
  templateUrl: 'lista-notas.component.html'
})

export class ListaNotasComponent implements OnInit {

  contador: Number[] = [];
  notas: Notas[] = [];
  nott: Notas = new Notas("Nuevo Notas", null);
  idUsuario: number = parseInt(window.sessionStorage.getItem("ValueUs"));
  @ViewChild('largeModal') public largeModal: ModalDirective;

  constructor(private notasService: NotasService,
    private router : Router) {

  }

  ngOnInit(): void {


    this.notasService.listNotas(this.idUsuario).subscribe(model => {

      this.notas = model;

    }, err => {
      console.log("No existen notas creados");
    });
  }

  navigate(idP : number){

    //alert(idP);
    this.router.navigate(['/notas/categoria/'+idP]);

  }
  onCreate() {

    let usuario = new Usuario("", "", "", "", null, null, true, "");
    usuario.id = this.idUsuario;

    this.nott.usuario = usuario;
    this.notasService.save(this.nott).subscribe(model => {

      alert(model.mensaje);
      this.notas.push(this.nott);
      this.largeModal.hide();
    }, err => {
      alert("No se pudo insertar");
    });

  }

}