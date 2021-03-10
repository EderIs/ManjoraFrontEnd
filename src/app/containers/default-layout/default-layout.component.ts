import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Notificacion } from '../../models/Notificacion';
import { Usuario } from '../../models/usuario';
import { ArchivosService } from '../../service/archivos';
import { NotificacionService } from '../../service/notificacion.service';
import { OutputsService } from '../../service/outputs.service';
import { TokenService } from '../../service/token.service';
import { UsuarioService } from '../../service/usuario.service';
import { WebSocketsService } from '../../service/webSockets.service';
import { navItems, navItemsUser } from '../../_nav';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public sidebarMinimized = false;
  public navItems;
  public roles: string[] = [];
  public nombreUsuarioFont: string;
  usuario: Usuario;
  imagen: SafeUrl;
  imagenObservable: Subscription;
  usuarioObservable: Subscription;
  webSocketSub: Subscription;
  notificaciones: Notificacion[] = [];
  idUsuario: number = parseInt(window.sessionStorage.getItem("ValueUs"));
  contador: number = 0;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private archivoService: ArchivosService,
    private sanitizer: DomSanitizer,
    private outputsService: OutputsService,
    public webSocketsService: WebSocketsService,
    public notificacionService: NotificacionService
  ) {

  }

  ngOnInit(): void {

    this.outputsService.disparador.subscribe(model => {

      this.changeI(model);

    });
    
    if (this.tokenService.getToken != null) {
      this.nombreUsuarioFont = this.tokenService.getUserName();
      this.getUserData(this.nombreUsuarioFont);
      this.roles = this.tokenService.getAuthorities();

      if (this.roles[0] == "ROLE_USER" && this.roles.length == 1) {

        this.navItems = navItemsUser;

      } else {

        this.navItems = navItems;

      }
    }
   
    this.connectionNotification();
    this.reviewConnection();
  }

  ngOnDestroy(): void {
    if (this.imagenObservable != null) {
      this.imagenObservable.unsubscribe();
    }
    if (this.usuarioObservable != null) {
      this.usuarioObservable.unsubscribe();
    }
    if(this.webSocketSub !=null){
      this.webSocketSub.unsubscribe();
    }
  }

  connectionNotification() {
    this.webSocketsService.initializeWebSocketConnection();
  }

  reviewConnection() {
    this.webSocketSub = this.outputsService.disparadorNot.subscribe(model => {
      if (this.idUsuario == model.usuarioDestino.id) {
        this.notificaciones.push(model);
        this.contador++;
      }
    });
  }

  getUserData(nameUser) {
    this.usuarioObservable = this.usuarioService.detailName(nameUser).subscribe(model => {

      this.usuario = model;
      window.sessionStorage.setItem("ValueUs", this.usuario.id.toString());
      if (this.usuario.pathImagen !== "Ninguna" || this.usuario.pathImagen !== null) {

        this.imagenObservable = this.archivoService.uploadImagen(this.usuario.pathImagen).subscribe(model => {
          let imagenBase = window.URL.createObjectURL(model);
          this.imagen = this.sanitizer.bypassSecurityTrustUrl(imagenBase);
        }, err => {
          this.imagen = this.sanitizer.bypassSecurityTrustUrl("assets/img/avatars/perfil.png");
        });
      } else {
        this.imagen = this.sanitizer.bypassSecurityTrustUrl("assets/img/avatars/perfil.png");
      }
  
      this.notificacionService.getNotifications(this.usuario.id).subscribe(model => {
        this.notificaciones = model;
        this.contador = this.notificaciones.length;
      }, err => {
        this.notificaciones = [];
      });
    });
  }

  changeI(event: string) {

    this.imagen = this.sanitizer.bypassSecurityTrustUrl(event);

  }

  logOut(): void {

    this.router.navigate(['/login']);
    this.tokenService.logOut();

  }

  navegar(ruta) {
    
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([ruta]));
   
    if (this.contador > 0)
      this.contador -= 1;
  }
}
