import { Component, OnInit } from '@angular/core';
import  {PaisService} from '../../../service/pais.service';
import  {Pais} from '../../../models/pais';
@Component({
  templateUrl: 'lista-pais.component.html'
})

export class ListaPaisComponent implements OnInit{
  
paises : Pais[]= [];
busqueda: string="";

  constructor(private paisService : PaisService){}

  ngOnInit(): void {
      this.cargarPais();    
  }
  cargarPais(): void{
    this.paisService.lista().subscribe(
      data => {
        this.paises = data;
      },
      err =>{
        console.log(err);
      }
    )
  }

  onSearch(){
    if(this.busqueda != " "){
      this.paisService.listaByNombre(this.busqueda).subscribe(model=>{
      this.paises=model;
      },err=>{
        alert('No existen estados');
      })
    }else{
      alert('No se realizo la busqueda correctamente');
    }
  }

delete(id:number){

if(id > 0){

  this.paisService.delete(id).subscribe(model=>{
alert('Se elimino el registro');
this.cargarPais();

  },err=>{

alert("No se pudo eliminar Pais");
console.log(err.error.mensaje);

  })

}else{
alert('no hay numero');
}


}

}