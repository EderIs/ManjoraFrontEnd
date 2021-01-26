import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Banco } from '../../../models/banco';
import { Pais } from '../../../models/pais';
import { BancoService } from '../../../service/banco.service';
import { PaisService } from '../../../service/pais.service';


@Component({
  templateUrl: 'nuevoeditar-banco.component.html'
})

export class NuevoEditarBancoComponent implements OnInit{
  
  banco :Banco = null;
  private id :number =this.activatedRouter.snapshot.params.id;
  paises : Pais[] =[];
  pais :string [] =[];
  pais1 : number = 0; 

constructor(private bancoService : BancoService
  ,private activatedRouter:ActivatedRoute,private route: Router
  ,private paisService: PaisService){}

  ngOnInit(): void {

    if(this.id > 0){
this.bancoService.detail(this.id).subscribe(model=>{

this.banco = model;

},err=>{

console.log('error en: '+ err.err.message);

})
    }else{
    this.banco= new Banco('','','','','',null,0,'','',false);
    console.log(this.banco.nombre); 
    this.cargarPais();  
  }
  }

onCreate():void{
this.pais.push(this.pais1.toString()," ");


this.banco.setPais(new Pais(this.pais));

this.bancoService.save(this.banco).subscribe(model=>{

console.log(JSON.stringify(this.banco));

this.route.navigate(['contacto/banco/listarBanco']);


},err=>{
console.log(err.errr.mensaje);

})

alert(this.pais1);

}
onDetails(){
  
}

cargarPais():void{
this.paisService.lista().subscribe(model=>{

this.paises =model;

},err=>{

  console.log(err.err.mensaje);
})

}

}


