import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contacto } from '../../models/contacto';
import { ContactoService } from '../../service/contacto.service';

@Component({
  selector: 'app-lista-contacto',
  templateUrl: 'lista-contacto.component.html',
  styleUrls: ['nuevoeditar-contacto.component.scss'],
})

export class listaContactoComponent implements OnInit, OnDestroy{

  contactos: Contacto[] = [];
  dtTrigger = new Subject();


  constructor(
    private contactoService: ContactoService
    ) { }


  ngOnInit() {
      this.contactoService.lista().subscribe(contactos => {
       this.contactos=contactos;
       this.dtTrigger.next();
     });
    this.contactoService.lista().subscribe();
  }


  delete( id: number){
    try {
      this.contactoService.delete(id).subscribe(res => {
        this.contactos = this.contactos.filter(contacto => contacto.id !== res.id);
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



















/* import { Component, OnInit } from '@angular/core';
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

} */