import { Component, OnInit } from '@angular/core';
import  {PaisService} from '../../../service/pais.service';
import  {Pais} from '../../../models/pais';
import { Contacto } from '../../../models/contacto';
import { Departamento } from '../../../models/departamento';
import { ContactoService } from '../../../service/contacto.service';
import { DepartamentoService } from '../../../service/departamento.service';
@Component({
  templateUrl: 'lista-departamento.component.html'
})

export class ListaDepartamentoComponent implements OnInit{
 
  departamentos: Departamento[] = [];
  busqueda:string="";
  
  constructor(private departamentoService: DepartamentoService) { }
  


  ngOnInit(): void {
    this.cargarDepartamentos();
  }
  cargarDepartamentos(): void{
    this.departamentoService.lista().subscribe(
      data => {
        this.departamentos = data;
      },
      err =>{
        console.log(err);
      }
    )
  }

  borrar(id: number) {
    this.departamentoService.delete(id).subscribe(
      data => {
       console.log(data);
        this.cargarDepartamentos();
      },
      err => {
        console.log(err)
      }
    );
  }

  onSearch(){

    if(this.busqueda != " "){
  
  this.departamentoService.listaByNombre(this.busqueda).subscribe(model=>{
  
  this.departamentos=model;
  
  },err=>{
  
    alert('No existen departamentos');
  })
  
  
    }else{
  
  alert('No se realizo la busqueda correctamente');
  
    }
  
  
  }

}