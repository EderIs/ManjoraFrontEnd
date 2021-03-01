import { Component, OnDestroy, OnInit } from '@angular/core';
import  {PaisService} from '../../../service/pais.service';
import  {Pais} from '../../../models/pais';
import { Contacto } from '../../../models/contacto';
import { Departamento } from '../../../models/departamento';
import { ContactoService } from '../../../service/contacto.service';
import { DepartamentoService } from '../../../service/departamento.service';
import { Subject } from 'rxjs';
@Component({
  templateUrl: 'lista-departamento.component.html'
})

export class ListaDepartamentoComponent implements OnInit, OnDestroy{
  departamentos: Departamento[] = [];
  dtTrigger = new Subject();


  constructor(
    private departamentoService: DepartamentoService
    ) { }


  ngOnInit() {
      this.departamentoService.lista().subscribe(departamentos => {
       this.departamentos=departamentos;
       this.dtTrigger.next();
     });
    this.departamentoService.lista().subscribe();
  }


  delete( id: number){
    try {
      this.departamentoService.delete(id).subscribe(res => {
        this.departamentos = this.departamentos.filter(departamento => departamento.id !== res.id);
        alert("registro borrado!!")
      });
    } catch (error) {
       alert("error al eliminar")
      console.error(error);
    }
      
}
  ngOnDestroy(){
      this.dtTrigger.unsubscribe()
    }
}