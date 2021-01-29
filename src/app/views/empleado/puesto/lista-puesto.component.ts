import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../../service/banco.service';
import { Puesto } from '../../../models/puesto';
import { PuestoService } from '../../../service/puesto.service';
@Component({
  templateUrl: 'lista-puesto.component.html'
})

export class ListaPuestoComponent implements OnInit{
  

puestos : Puesto[]=[];
busqueda:string="";



constructor(private puestoService : PuestoService){}

ngOnInit(): void {
 
  this.cargarPuestos();

}

cargarPuestos(){

this.puestoService.lista().subscribe(model=>{

this.puestos = model;

console.log(model)

},err=>{
  console.log(err.err.mensaje);
});

}

delete(id:number){
if(id > 0){

this.puestoService.delete(id).subscribe(model=>{

  alert('Se elimino correctaente el puesto');
  this.cargarPuestos();
},err=>{
  
  alert("No se pudo eliminar");

})

}else{
alert('Error al eliminar el puesto');

}
}

onSearch(){

if(this.busqueda != " "){

this.puestoService.listaByNombre(this.busqueda).subscribe(model=>{

this.puestos=model;

},err=>{

alert('No existen puestos');
})


}else{

alert('No se realizo la busqueda correctamente');

}


}

}