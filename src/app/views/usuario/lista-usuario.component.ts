import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: 'Lista-usuario.component.html'
})

export class ListaUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  cargarUsuarios(): void {
    this.usuarioService.lista().subscribe(model => {

      this.usuarios = model;

    }, err => {

    })
  }

  borrarUsuario(id: number): void {

    this.usuarioService.delete(id).subscribe(model => {

      alert("Usuario eliminado");
      this.cargarUsuarios();
    }, err => {
      console.log(err.error.mensaje);
    })

  }

}