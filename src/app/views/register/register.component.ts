import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {


  idUsuario: number = this.activatedRouter.snapshot.params.id;
  usuario: Usuario;
  repContrasena: string;
  roles:string[]=[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.idUsuario > 0 || this.idUsuario != null) {

      this.authService.detail(this.idUsuario).subscribe(model => {

        this.usuario = model;

        this.usuario.nombreUsuario = "";
        this.usuario.password = "";

      }, err => {
        console.log(err.error.mensaje);
      });
    }
  }

  onCreate() {

    if (this.idUsuario > 0) {
      this.repContrasena;
      if (this.repContrasena == this.usuario.password) {
        this.usuario.estado = true;
        this.usuario.ultimoAcceso = new Date;
        this.roles.push('user');
        this.usuario.authorities=this.roles;
        this.authService.register(this.idUsuario, this.usuario).subscribe(model => {
          this.router.navigate(['/dashboard']);
        }, err => { alert(err.error.mensaje); })
      } else {
        alert('la contrasena no es igual');
      }
    }
  }
}
