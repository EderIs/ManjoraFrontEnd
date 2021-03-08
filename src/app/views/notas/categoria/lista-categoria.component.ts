import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Categoria } from '../../../models/Categoria';
import { Notas } from '../../../models/notas';
import { Nota } from '../../../models/nota';
import { CategoriaService } from '../../../service/categoria.service';
import { NotaService } from '../../../service/nota.service';


@Component({
    selector: 'app-lista-notas',
    templateUrl: 'lista-categoria.component.html',
    styleUrls: ['lista-categoria.scss']
})

export class ListaCategoriaComponent implements OnInit {

    @ViewChild('largeModal') public largeModal: ModalDirective;
    categorias: Categoria[] = [];
    notas: Nota[] = [];
    contador: number = 0;
    categoriaS: Categoria = new Categoria("Nueva Categoria", null, true);
    idNotas: number = this.activatedRotuter.snapshot.params.id;
    listArrayDin: Map<number, Nota[]> = new Map<number, Nota[]>();
    constructor(private categoriaService: CategoriaService,
        private router: Router,
        private activatedRotuter: ActivatedRoute,
        private notaService: NotaService) {
    }

    ngOnInit() {

        if (this.idNotas > 0) {
            this.reloadCategoriasWithNotas();

        } else {
            this.router.navigate(['notas/notas']);
        }
    }

    navigate(idP : number){

        //alert(idP);
        this.router.navigate(['/notas/nota/'+idP]);
    
      }

    reloadCategoriasWithNotas() {
        this.categoriaService.getCategorias(this.idNotas).subscribe(model => {

            this.categorias = model;
            if (this.categorias.length > 0) {
                this.categorias.forEach(categoria => {
                    this.notaService.getNotasByCategoria(categoria.id).subscribe(model => {
                        if (model.length > 0) {
                            this.listArrayDin.set(categoria.id, model);
                        } else {
                            this.listArrayDin.set(categoria.id, []);
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

            let nota = new Nota("",null,null,null,null,true);

            let categoria =  new Categoria("",null,true);

            let arrayUpdate = this.listArrayDin.get(parseInt(event.previousContainer.id));
            categoria.id = parseInt(event.container.id);

            nota.categoria = categoria;

            nota.id = arrayUpdate[0].id;

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
        let notasE = new Notas("", null);
        notasE.id = this.idNotas;
        this.categoriaS.notas = notasE;

        this.categoriaService.saveCategorias(this.categoriaS).subscribe(model => {
            alert("Se inserto");
            this.reloadCategoriasWithNotas();
            this.largeModal.hide();
        });

    }

    activity(){
        alert('hola');
    }
}
