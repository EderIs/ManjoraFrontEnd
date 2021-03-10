import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Etapa } from '../../../models/Etapa';
import { Notificacion } from '../../../models/Notificacion';
import { Proyecto } from '../../../models/proyecto';
import { Tarea } from '../../../models/tarea';
import { Usuario } from '../../../models/usuario';
import { EtapaService } from '../../../service/etapa.service';
import { OutputsService } from '../../../service/outputs.service';
import { TareaService } from '../../../service/tarea.service';
import { UsuarioService } from '../../../service/usuario.service';
import { WebSocketsService } from '../../../service/webSockets.service';


@Component({
    selector: 'app-lista-proyecto',
    templateUrl: 'lista-etapa.component.html',
    styleUrls: ['lista-etapa.scss']
})

export class ListaEtapaComponent implements OnInit {

    @ViewChild('largeModal') public largeModal: ModalDirective;
    @ViewChild('myModal') public myModal: ModalDirective;
    etapas: Etapa[] = [];
    tareas: Tarea[] = [];
    contador: number = 0;
    usuarios : Usuario[] = [];
    idUsuario2 : String="0";
    tarea : Tarea = new Tarea("",null,null,null,null,true);
    etapaS: Etapa = new Etapa("", null, true);
    res :boolean = false;
    idProyecto: number = this.activatedRotuter.snapshot.params.id;
    idTarea : number = 0;
    listArrayDin: Map<number, Tarea[]> = new Map<number, Tarea[]>();
    notificacion: Notificacion = new Notificacion(0,"","","",null,true,"");
    
    constructor(private etapaService: EtapaService,
        private router: Router,
        private activatedRotuter: ActivatedRoute,
        private tareaService: TareaService,
        private usuarioService: UsuarioService,
        private webSocketsService :WebSocketsService
        ) {
    }

ngOnInit() {

        if (this.idProyecto > 0) {
            this.reloadEtapasWithTareas();
            this.cargarUsuarios();
        } else {
            this.router.navigate(['proyecto/proyecto']);
        }
    }

reloadEtapasWithTareas() {
        this.etapaService.getEtapas(this.idProyecto).subscribe(model => {

            this.etapas = model;
            if (this.etapas.length > 0) {
                this.etapas.forEach(etapa => {
                    this.tareaService.getTareasByEtapa(etapa.id).subscribe(model => {
                        if (model.length > 0) {
                            this.listArrayDin.set(etapa.id, model);
                        } else {
                            this.listArrayDin.set(etapa.id, []);
                        }
                    });

                });
            }
        });
    }

drop(event: CdkDragDrop<Tarea[]>) {

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        } else {

            let tarea = new Tarea("",null,null,null,null,true);

            let etapa =  new Etapa("",null,true);
            let e = event.previousIndex;
            let arrayUpdate = this.listArrayDin.get(parseInt(event.previousContainer.id));
            etapa.id = parseInt(event.container.id);

            tarea.etapa = etapa;

            tarea.id = arrayUpdate[e].id;

             this.tareaService.updateTareaByEtapa(tarea.id,tarea).subscribe(model=>model);
             transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }

    }

stopCount(idEtapa: number): Tarea[] {
        return this.listArrayDin.get(idEtapa);
    }

onCreate() {
        if(this.etapaS.id > 0){

            this.etapaService.updateEtapa(this.etapaS.id, this.etapaS).subscribe(model=>{

                alert(model.mensaje);
                this.largeModal.hide();
            },err=>{
                alert(err.error.mensaje);
            });

        }else{
            let proyectoE = new Proyecto("", null);
            proyectoE.id = this.idProyecto;
            this.etapaS.proyecto = proyectoE;
    
            this.etapaService.saveEtapa(this.etapaS).subscribe(model => {
                alert("Se inserto");
                this.reloadEtapasWithTareas();
                this.largeModal.hide();
            });
        }
        

    }

onCreateTarea(){
        if(this.tarea!=null){

            this.tarea.fechaInicio = new Date();
            let usuario = this.idUsuario2.split('-');
           this.tarea.usuario= new Usuario(usuario[1],"","","",null,null,null,"");
           this.tarea.usuario.id = parseInt(usuario[0]);
           this.tareaService.saveTarea(this.tarea).subscribe(model=>{

                this.tarea = model;
                let arrayT = this.listArrayDin.get(this.tarea.etapa.id);
                arrayT.push(this.tarea);
                this.listArrayDin.set(this.tarea.etapa.id,arrayT);
                this.mandarNotificacion(this.tarea);
                this.tarea =new Tarea("",null,null,null,null,true);
                this.idUsuario2="0";
               this.myModal.hide();
             });
        }
    }

mandarNotificacion(tareaNot: Tarea){
        this.notificacion.titulo="Te han asignado una tarea: "+tareaNot.nombre;
        this.notificacion.usuarioDestino=tareaNot.usuario;
        this.notificacion.resumen="La fecha de entrega: "+tareaNot.fechaFinal;
        this.notificacion.ruta ="proyecto/tarea/"+tareaNot.id;
        this.webSocketsService.sendMessage(this.notificacion);
    }

crearActividad(etapa : Etapa){
        this.tarea.etapa = etapa;
        console.log(this.tarea);
        this.myModal.show();
    }

eliminarEtapa(etapa:Etapa){
        this.etapaS = etapa;
        this.etapaS.estatus = false;
        this.etapaService.updateEtapa(this.etapaS.id,this.etapaS).subscribe(model=>
            {
this.reloadEtapasWithTareas();

            },err=>{
                alert(err.error.mensaje);
            });
    }

editarEtapa(etapa : Etapa){
        this.etapaS = etapa;
        this.largeModal.show();
    }

cargarUsuarios() {

        this.usuarioService.listUsuarios().subscribe(model => {
          this.usuarios = model
        });
      }


}
