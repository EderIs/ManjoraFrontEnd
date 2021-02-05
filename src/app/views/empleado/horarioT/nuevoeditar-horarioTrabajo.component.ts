import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HoraLaboral } from '../../../models/horaLaboral';
import { HorarioTrabajo } from '../../../models/horarioTrabajo';
import { HorarioLabService } from '../../../service/horario-lab.service';
import { HorarioTrapService } from '../../../service/horario-trap.service';


@Component({
  templateUrl: 'nuevoeditar-horarioTrabajo.component.html'
})

export class NuevoEditarHorarioTrabajoComponent implements OnInit{
  HorasL: HoraLaboral[] = [];
  horarioT: HorarioTrabajo = null;
  horaL : string [] =[];
  horaL1 : number = 0; 
  id: number = this.activatedRoute.snapshot.params.id;
  
  
  constructor(
    private horarioLabService: HorarioLabService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private horarioTrabService: HorarioTrapService
    ) { }
  
  ngOnInit(): void {
    this.cargarHorarioL();
    if (this.id != null){
      this.horarioTrabService.detail(this.id).subscribe(
        data => {
          this.horarioT = data;
          console.log(this.horarioT);
          this.horaL1 = data.horasLaborales.id;
        },
        err => {
          console.log(err);
         
        }
      );
      this.horarioT = new HorarioTrabajo(this.horaL);
    }
    else{
      this.horarioT = new HorarioTrabajo(this.horaL);
    }
  }

  cargarHorarioL(): void {
    this.horarioLabService.lista().subscribe(
      data => {
        this.HorasL = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onCreate(): void {
    this.horaL.push(this.horaL1.toString(),"",null);
    if(this.id!=null){
      this.horarioT.horasLaborales.id = this.horaL1;
      this.horarioTrabService.update(this.id, this.horarioT).subscribe(
        data => {
          this.horarioT = data;
          console.log(this.horarioT);
        },
          err => {
            console.log(err);
            console.log(this.horarioT);
            });
    }
    else{
    this.horarioT.setHoraLaboral(new HoraLaboral(this.horaL));
    this.horarioTrabService.save(this.horarioT).subscribe(
      response => {
        console.log(this.horarioT);
       alert('Se inserto correctamente');

      },
      error =>{
        console.log(error);
      }
    );
    }
    this.router.navigate(['/empleado/horarioT/listarHorarioT']);
  }

}