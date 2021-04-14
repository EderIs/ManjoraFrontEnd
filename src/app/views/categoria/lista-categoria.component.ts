import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categoria } from '../../models/Categoria';
import { Nota } from '../../models/nota';
import { Notificacion } from '../../models/Notificacion';
import { Usuario } from '../../models/usuario';
import { CategoriaService } from '../../service/categoria.service';
import { NotaService } from '../../service/nota.service';
import { UsuarioService } from '../../service/usuario.service';
import { WebSocketsService } from '../../service/webSockets.service';


@Component({
    selector: 'app-lista-categoria',
    templateUrl: 'lista-categoria.component.html',
    styleUrls: ['lista-categoria.scss']
})

export class ListaCategoriaComponent implements OnInit {

    @ViewChild('largeModal') public largeModal: ModalDirective;
    @ViewChild('myModal') public myModal: ModalDirective;
    categorias: Categoria[] = [];
    notas: Nota[] = []; 
    contador: number = 0;
    usuarios : Usuario[] = [];
    idUsuario2 : String="0";
    nota : Nota = new Nota("",new Usuario("","","","",null,null,null,""),new Categoria("", 
    new Usuario("","","","",null,null,null,""),null),null,null,null);
    categoria: Categoria = new Categoria("",new Usuario("","","","",null,null,null,""),null );
    res :boolean = false;
    idUser: number = parseInt(window.sessionStorage.getItem("ValueUs"));
    idNota : number = 0;
    listArrayDin: Map<number, Nota[]> = new Map<number, Nota[]>();
    notificacion: Notificacion = new Notificacion(0,"","","",new Usuario("","","","",null,null,null,""),true,"");
    
    constructor(private categoriaService: CategoriaService,
        private router: Router,
        private activatedRotuter: ActivatedRoute,
        private notaService: NotaService,
        private usuarioService: UsuarioService,
        private webSocketsService :WebSocketsService
        ) {
    }

ngOnInit() {

        if (this.idUser > 0) {
            this.reloadCategoriasWithNotas();
            this.cargarUsuarios();
        } else {
            this.router.navigate(['categoria/categoria']);
        }
    }

reloadCategoriasWithNotas() {
        this.categoriaService.getCategorias(this.idUser).subscribe(model => {

            this.categorias = model;
            if (this.categorias.length > 0) {
                this.categorias.forEach(nota => {
                    this.notaService.getNotasByCategoria(nota.id).subscribe(model => {
                        if (model.length > 0) {
                            this.listArrayDin.set(nota.id, model);
                        } else {
                            this.listArrayDin.set(nota.id, []);
                        }
                    });

                });
            }
        });
    }

drop(event: CdkDragDrop<Nota[]>) {

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        } else {

            let nota = new Nota("",new Usuario("","","","",null,null,null,""),new Categoria("", 
            new Usuario("","","","",null,null,null,""),null),null,null,null);

            let categoria =  new Categoria("",new Usuario("","","","",null,null,null,""),true);
            let e = event.previousIndex;
            let arrayUpdate = this.listArrayDin.get(parseInt(event.previousContainer.id));
            categoria.id = parseInt(event.container.id);

            nota.categoria = categoria;

            nota.id = arrayUpdate[e].id;

             this.notaService.updateNotaByCategoria(nota.id,nota).subscribe(model=>model);
             transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }

    }

stopCount(idCategoria: number): Nota[] {
        return this.listArrayDin.get(idCategoria);
    }

onCreate() {
        if(this.categoria.id > 0){

            this.categoriaService.updateCategoria(this.categoria.id, this.categoria).subscribe(model=>{

                alert(model.mensaje);
                this.largeModal.hide();
            },err=>{
                alert(err.error.mensaje);
            });

        }else{
            this.categoria.usuario.id = this.idUser;
            this.categoriaService.saveCategorias(this.categoria).subscribe(model => {
                alert("Categoria Creada");
                this.reloadCategoriasWithNotas();
                this.largeModal.hide();
            });
        }
        

    }

onCreateNota(){
        if(this.nota!=null){

            this.nota.fechaInicio = new Date();
            let usuario = this.idUsuario2.split('-');
           this.nota.usuario= new Usuario(usuario[1],"","","",null,null,null,"");
           this.nota.usuario.id = parseInt(usuario[0]);
           this.notaService.createNota(this.nota).subscribe(model=>{

                this.nota = model;
                alert("Nota Creada");
                this.mandarNotificacion(this.nota);
                this.nota = new Nota("",new Usuario("","","","",null,null,null,""),new Categoria("", 
                new Usuario("","","","",null,null,null,""),null),null,null,null);
                this.idUsuario2="0";
               this.myModal.hide();
               this.reloadCategoriasWithNotas();
             });
        }
    }

    mandarNotificacion(nota: Nota){
        this.notificacion.titulo="Nota Creada: "+nota.nombre;
        this.notificacion.usuarioDestino = nota.usuario;
        this.notificacion.resumen="La fecha de entrega: "+nota.fechaFinal;
        this.notificacion.ruta ="categoria/nota/"+nota.id;
        this.webSocketsService.sendMessage(this.notificacion);
    }

crearActividad(categoria : Categoria){
        this.nota.categoria = categoria;
        console.log(this.nota);
        this.myModal.show();
    }

eliminarCategoria(categoria:Categoria){
        this.categoria = categoria;
        this.categoria.estatus = false;
        this.categoriaService.delete(this.categoria.id).subscribe(model => {
            alert("Categoria Eliminada");
            this.reloadCategoriasWithNotas();
          });
    }

    eliminarNota(nota:Nota){
        this.nota = nota;
        this.notaService.delete(this.nota.id).subscribe(model => {
            alert("Nota Eliminada");
            this.reloadCategoriasWithNotas();
          });
    }

editarCategoria(etapa : Categoria){
        this.categoria = etapa;
        this.largeModal.show();
    }

cargarUsuarios() {

        this.usuarioService.listUsuarios().subscribe(model => {
          this.usuarios = model
        });
      }


}
