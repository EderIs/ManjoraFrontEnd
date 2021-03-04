
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { ArchivosService } from '../../service/archivos';
import { OutputsService } from '../../service/outputs.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-nuevoeditar-usuario',
  templateUrl: 'nuevoeditar-usuario.component.html',
  styleUrls: ['nuevo-usuario.scss']

})

export class NuevoEditarUsuarioComponent implements OnInit, OnDestroy {

  repContrasena: String = "";
  usuario: Usuario=new Usuario("", "", "", "", null, null, false, "");
  @ViewChild("imagenI", { static: true }) element2: ElementRef;
  finishObservable: Subscription;
  private imagenCargar: File;
  idUsuario: number = (this.activateRoute.snapshot.params.id > 0) ? this.activateRoute.snapshot.params.id : 0;
  perfil : boolean = (this.activateRoute.snapshot.params.perfil == "true")?true : false;
  editarNombreUser :Boolean;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private render: Renderer2,
    private archivosService: ArchivosService,
    private activateRoute: ActivatedRoute,
    private outputsService : OutputsService
  ) { }


  ngOnInit(): void {

    if (this.idUsuario > 0) {
      this.usuarioService.detail(this.idUsuario).subscribe(model => {
        this.usuario = model;
        this.usuario.password = "";
        this.editarNombreUser = false;
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
      this.editarNombreUser = true;
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
              this.changeImagenUpdate(true);
              alert(model.mensaje);
              this.navigatePages();
            }, err => {
              alert(err.error.mensaje);
            }); 
          }, err => {
            console.log(err.error.mensaje);
          });
        }else{
          this.usuarioService.update(this.idUsuario, this.usuario).subscribe(model => {
            alert(model.mensaje);
            this.navigatePages();
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

navigatePages(){
  if(!this.perfil){
    this.router.navigate(['/usuario/listaUsuario']);
  }else{
    this.router.navigate(['/dashboard']);
  }
  
}

  changeNameServidor(nombreArchivo : File): string{

    let modificador = nombreArchivo.name.split('.');

    let nR = Math.round(Math.random() * 100);
    
    let extension = modificador[modificador.length - 1];

    let nuevoNombre = modificador[0]+nR+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+"."+extension;

    return nuevoNombre;
  }

  changeImagenUpdate(cierto : boolean){
    let idUserActive = parseInt(window.sessionStorage.getItem("ValueUs"));
    if(this.idUsuario == idUserActive && cierto == true){
      let urlI = window.URL.createObjectURL(this.imagenCargar);
      this.outputsService.disparador.emit(urlI);
    }
  }
}