import { Component, OnInit } from '@angular/core';
import  {PaisService} from '../../../service/pais.service';
import  {Pais} from '../../../models/pais';
@Component({
  templateUrl: 'lista-departamento.component.html'
})

export class ListaDepartamentoComponent implements OnInit{
  
paises : Pais[]= [];

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