import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HoraLaboral } from '../../../models/horaLaboral';
import { HorarioLabService } from '../../../service/horario-lab.service';


@Component({
  templateUrl: 'nuevoeditar-horasL.component.html'
})

export class NuevoEditarHorasLComponent implements OnInit{
nombreHoraL: string = "";
promedioHoraDia: number = null;
id : number= this.activatedRouter.snapshot.params.id;
horaL : HoraLaboral=null;
horasL :string []=[];


 constructor(
  private horaLService : HorarioLabService,
  private router: Router,
  private activatedRouter: ActivatedRoute,
  
  ) {}


  ngOnInit(): void {
    
if(this.id!=null){

this.horaLService.detail(this.id).subscribe(model=>{
this.horaL=model;
},
err=>{

console.log('el error esta aqui'+ err.err.message);
}
)
}
  }

onCreate(): void{

  if(this.horaL != null ){
this.horaLService.update(this.horaL.id,this.horaL).subscribe(model=>{

alert('Se actualizo correctaente, la hora');
this.router.navigate(['/empleado/horasL/listarHorasL']);

},err=>{
console.log('Ocurrio un error en '+err.err.message);
console.log(this.horaL);
})
}else{


  this.horasL.push("0", this.nombreHoraL, this.promedioHoraDia.toString());
  const horaL = new HoraLaboral(this.horasL);
  console.log(horaL);
  this.horaLService.save(horaL).subscribe(data=>{
  {
  alert('Se guardo correctamente hora laboral');
  console.log(data);
  this.router.navigate(['/empleado/horasL/listarHorasL']);
  }
  err =>{
    console.log(horaL.nombreHoraL, horaL.promedioHoraDia);
  alert('No se guardo el pais');
  }
  })
  }

}

}