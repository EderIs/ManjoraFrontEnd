import { Component, OnInit } from '@angular/core';
import { Banco } from '../../../models/banco';
import {BancoService} from '../../../service/banco.service';


@Component({
  templateUrl: 'lista-banco.component.html'
})

export class listaBancoComponent implements OnInit{
  

bancos : Banco[]=[];

constructor(private bancoService : BancoService){}

  ngOnInit(): void {
   
    this.cargarBancos();
  
  }

cargarBancos(){

  this.bancoService.lista().subscribe(model=>{

this.bancos = model;

console.log(model)

  },err=>{
    console.log(err.err.mensaje);
  });
  
}

delete(id:number){
if(id > 0){

  this.bancoService.delete(id).subscribe(model=>{

    alert('Se elimino correctaente el banco');
    this.cargarBancos();
  },err=>{
    
    alert("No se pudo eliminar");

  })

}else{
alert('Error al eliminar el Bamco');

}
}
}