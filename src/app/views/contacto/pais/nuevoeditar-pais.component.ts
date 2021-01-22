import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  {Pais} from '../../../models/pais'
import  {PaisService} from '../../../service/pais.service'
import {NgForm} from '@angular/forms';


@Component({
  templateUrl: 'nuevoeditar-pais.component.html'
})

export class NuevoEditarPaisComponent implements OnInit{


nombrePais: String = "";

 constructor(
  private paisService : PaisService,
  private router: Router,
  ) {

   

   }


  ngOnInit(): void {
    
  }

  onCreate(): void{

//const pais = new Pais(this.nombrePais);

alert(this.nombrePais);
  /*
this.paisService.save(pais).subscribe(data=>{

{
alert('Se guardo correctamente pais');
this.router.navigate(['/titulo/listaTitulo']);

}err =>{

alert('No se guardo el pais');

}


})
*/

}


}