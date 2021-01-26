import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import  {Pais} from '../../../models/pais'
import  {PaisService} from '../../../service/pais.service'


@Component({
  templateUrl: 'nuevoeditar-pais.component.html'
})

export class NuevoEditarPaisComponent implements OnInit{


nombrePais: string = "";
id : number= this.activatedRouter.snapshot.params.id;
pais : Pais=null;
pais1 :string []=[];


 constructor(
  private paisService : PaisService,
  private router: Router,
  private activatedRouter: ActivatedRoute,
  
  ) {}


  ngOnInit(): void {
    
if(this.id!=null){

this.paisService.detail(this.id).subscribe(model=>{
this.pais=model;
},
err=>{

console.log('el error esta aqui'+ err.err.message);
}
)
}
  }

onCreate(): void{

  if(this.pais != null ){
this.paisService.update(this.pais.id,this.pais).subscribe(model=>{

alert('Se actualizo correctaente, el pais');
this.router.navigate(['/contacto/pais/listarPais']);

},err=>{
console.log('Ocurrio un error en '+err.err.message);

})
}else{


  this.pais1.push("0",this.nombrePais);
  const pais = new Pais(this.pais1);
  
  this.paisService.save(pais).subscribe(data=>{
  {
  alert('Se guardo correctamente pais');
  this.router.navigate(['/contacto/pais/listarPais']);
  }
  err =>{
  
  alert('No se guardo el pais');
  }
  })
  }

}

}