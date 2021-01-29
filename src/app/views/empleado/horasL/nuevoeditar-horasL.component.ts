import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HoraLaboral } from '../../../models/horaLaboral';
import { HorarioLabService } from '../../../service/horario-lab.service';


@Component({
  templateUrl: 'nuevoeditar-horasL.component.html'
})

export class NuevoEditarHorasLComponent implements OnInit{
  id : number = this.activatedRouter.snapshot.params.id;
  horaL : HoraLaboral = null;
  horasL :string [] = [];
  nombreHoraL: string = ''; 
  promedioHoraDia : number = 0;

  constructor(
  private horarioService : HorarioLabService,
  private router: Router,
  private activatedRouter: ActivatedRoute,
  
  ) {}


  ngOnInit(): void {
    if(this.id!=null){
      this.horarioService.detail(this.id).subscribe(model=>{
        this.horaL = model;
      },
      err=>{

        console.log('el error esta aqui'+ err.err.message);
      }
      )
      this.horaL = new HoraLaboral(this.horasL);
    }
    else{
      this.horaL = new HoraLaboral(this.horasL);
    }
  }

onCreate(): void{
    if(this.id != null ){
      this.horarioService.update(this.horaL.id,this.horaL).subscribe(model=>{
        alert('Se actualizo correctaente, el pais');
        this.router.navigate(['/empleado/horasL/listarHorasL']);
      },err=>{
        console.log('Ocurrio un error en '+err.err.message);
      })
    }else{
      this.horasL.push("0", this.nombreHoraL, this.promedioHoraDia.toString() );
      const hora1 = new HoraLaboral(this.horasL);
      this.horarioService.save(this.horaL).subscribe(data=>{
      {
        alert('Se guardo correctamente pais');
        this.router.navigate(['/empleado/horasL/listarHorasL']);
        console.log(this.horaL)
      }
      err =>{
      
       alert('No se guardo el pais');
      }
      })
    }

}

}