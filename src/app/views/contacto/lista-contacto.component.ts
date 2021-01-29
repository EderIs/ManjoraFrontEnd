import { Component, OnInit } from '@angular/core';
import { Contacto } from '../../models/contacto';
import { ContactoService } from '../../service/contacto.service';

@Component({
  selector: 'app-lista-contacto',
  templateUrl: 'lista-contacto.component.html'
})

export class listaContactoComponent implements OnInit{
  
  contactos: Contacto[] = [];
  busqueda:string="";
  
  constructor(private contactoService: ContactoService) { }
  


  ngOnInit(): void {
    this.cargarContactos();
  }
  cargarContactos(): void{
    this.contactoService.lista().subscribe(
      data => {
        this.contactos = data;
      },
      err =>{
        console.log(err);
      }
    )
  }

  borrar(id: number) {
    this.contactoService.delete(id).subscribe(
      data => {
       console.log(data);
        this.cargarContactos();
      },
      err => {
        console.log(err)
      }
    );
  }

  onSearch(){

    if(this.busqueda != " "){
  
  this.contactoService.listaByNombre(this.busqueda).subscribe(model=>{
  
  this.contactos=model;
  
  },err=>{
  
    alert('No existen contactos');
  })
  
  
    }else{
  
  alert('No se realizo la busqueda correctamente');
  
    }
  
  
  }

}