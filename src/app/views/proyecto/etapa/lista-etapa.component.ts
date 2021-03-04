import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Etapa } from '../../../models/Etapa';
import { Proyecto } from '../../../models/proyecto';
import { Tarea } from '../../../models/tarea';
import { EtapaService } from '../../../service/etapa.service';
import { TareaService } from '../../../service/tarea.service';


@Component({
    selector: 'app-lista-proyecto',
    templateUrl: 'lista-etapa.component.html',
    styleUrls: ['lista-etapa.scss']
})

export class ListaEtapaComponent implements OnInit {

    @ViewChild('largeModal') public largeModal: ModalDirective;
    etapas: Etapa[] = [];
    tareas: Tarea[] = [];
    contador: number = 0;
    etapaS: Etapa = new Etapa("Nueva Etapa", null, true);
    idProyecto: number = this.activatedRotuter.snapshot.params.id;
    listArrayDin: Map<number, Tarea[]> = new Map<number, Tarea[]>();
    constructor(private etapaService: EtapaService,
        private router: Router,
        private activatedRotuter: ActivatedRoute,
        private tareaService: TareaService) {
    }

    ngOnInit() {

        if (this.idProyecto > 0) {
            this.reloadEtapasWithTareas();

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

            let arrayUpdate = this.listArrayDin.get(parseInt(event.previousContainer.id));
            etapa.id = parseInt(event.container.id);

            tarea.etapa = etapa;

            tarea.id = arrayUpdate[0].id;

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
        let proyectoE = new Proyecto("", null);
        proyectoE.id = this.idProyecto;
        this.etapaS.proyecto = proyectoE;

        this.etapaService.saveEtapa(this.etapaS).subscribe(model => {
            alert("Se inserto");
            this.reloadEtapasWithTareas();
            this.largeModal.hide();
        });

    }

    activity(){
        alert('hola');
    }
}
