
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { ArchivosService } from '../../service/archivos';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-nuevoeditar-usuario',
  templateUrl: 'nuevoeditar-usuario.component.html',
  styleUrls: ['nuevo-usuario.scss']

})

export class NuevoEditarUsuarioComponent implements OnInit, OnDestroy {

  @Output() imagenEventChange = new EventEmitter<String>();
  repContrasena: String = "";
  usuario: Usuario = null;
  @ViewChild("imagenI", { static: true }) element2: ElementRef;
  finishObservable: Subscription;
  private imagenCargar: File;
  idUsuario: number = (this.activateRoute.snapshot.params.id > 0) ? this.activateRoute.snapshot.params.id : 0;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private render: Renderer2,
    private archivosService: ArchivosService,
    private activateRoute: ActivatedRoute
  ) { }


  ngOnInit(): void {

    if (this.idUsuario > 0) {
      this.usuarioService.detail(this.idUsuario).subscribe(model => {
        this.usuario = model;
        this.usuario.password = "";
        if (this.usuario.pathImagen != "Ninguna") {
          this.archivosService.uploadImagen(this.usuario.pathImagen).subscribe(model => {
            let url = window.URL.createObjectURL(model);
            this.render.setAttribute(this.element2.nativeElement, "src", url);
          }, err => {
            console.log(err)
          });
        }
      }, err => {
        alert(err.error.mensaje);
      });
    } else {
      this.usuario = new Usuario("", "", "", "", null, null, false, "");
    }
  }

  ngOnDestroy(): void {
    if (this.finishObservable != null) {
      this.finishObservable.unsubscribe();
    }

  }

  cargarImagen(event) {

    let imagen = event.target.files;

    let url = window.URL.createObjectURL(imagen[0]);

    this.render.setAttribute(this.element2.nativeElement, "src", url);

    if (imagen.length > 0) {

      this.imagenCargar = imagen[0];
    } else {
      this.imagenCargar = null;
    }
   this.changeNameServidor(this.imagenCargar);
  }

  onCreate(): void {
    if(this.usuario.password == this.repContrasena){
      if (this.idUsuario > 0) {
      
        if(this.imagenCargar !=null && this.imagenCargar.name != this.usuario.pathImagen){
          let formData1 = new FormData();
          formData1.append("imagenU", this.imagenCargar,this.changeNameServidor(this.imagenCargar));
           this.archivosService.updateImagen(this.usuario.pathImagen, formData1).subscribe(model => {
            this.usuario.pathImagen = model.mensaje

            this.usuarioService.update(this.idUsuario, this.usuario).subscribe(model => {
              this.changeImagenUpdate(this.usuario.pathImagen);
              alert(model.mensaje);
              this.router.navigate(['/usuario/listaUsuario']);
            }, err => {
              alert(err.error.mensaje);
            }); 
          }, err => {
            console.log(err.error.mensaje);
          });
        }else{
          this.usuarioService.update(this.idUsuario, this.usuario).subscribe(model => {
            alert(model.mensaje);
            this.router.navigate(['/usuario/listaUsuario']);
          }, err => {
            alert(err.error.mensaje);
          });
        }
      } else {
        if (this.imagenCargar != null) {
          let formData1 = new FormData();
  
          formData1.append("imagen", this.imagenCargar,this.changeNameServidor(this.imagenCargar));
  
          this.finishObservable = this.archivosService.saveImagen(formData1).subscribe(model => {
  
            let path = model.mensaje;
  
            if (this.usuario != null) {
              this.usuario.fechaCreacion = new Date();
              this.usuario.pathImagen = path;
              this.usuarioService.save(this.usuario).subscribe(model => {
                alert(model.mensaje);
                this.router.navigate(['/usuario/listaUsuario']);
              }, err => {
                alert(err.error.mensaje);
              });
            }
          });
        } else {
          if (this.usuario != null) {
            this.usuario.fechaCreacion = new Date();
            this.usuario.pathImagen = "Ninguna";
            this.usuarioService.save(this.usuario).subscribe(model => {
              alert(model.mensaje);
              this.router.navigate(['/usuario/listaUsuario']);
            }, err => {
              alert(err.error.mensaje);
            });
          }
        }
      }
    }else{
alert("La contraseña debe ser la misma");
    }
    
  }

  changeNameServidor(nombreArchivo : File): string{

    let modificador = nombreArchivo.name.split('.');

    let nR = Math.round(Math.random() * 100);
    
    let nuevoNombre = modificador[0]+nR+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+"."+modificador[1];

    return nuevoNombre;
  }

  changeImagenUpdate(nombrePath : String){
    let idUserActive = parseInt(window.sessionStorage.getItem("ValueUs"));
    if(this.idUsuario == idUserActive){
      this.imagenEventChange.emit(window.URL.createObjectURL(nombrePath));
    }
  }
}