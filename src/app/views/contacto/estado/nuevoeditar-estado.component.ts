import { Component, OnInit } from '@angular/core';
import { Pais } from '../../../models/pais';
import { PaisService } from '../../../service/pais.service';
import { EstadoService } from '../../../service/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../../../models/estado';

@Component({
  templateUrl: 'nuevoeditar-estado.component.html'
})

export class NuevoEditarEstadoComponent implements OnInit{
  paises: Pais[] = [];
  estado: Estado = null;
  pais : string [] =[];
  pais1 : number = 0; 
  id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private paisService: PaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private estadoService: EstadoService
    ) { }
  
  ngOnInit(): void {
    this.cargarPaises();
    if (this.id != null){
      this.estadoService.detail(this.id).subscribe(
        data => {
          this.estado = data;
        },
        err => {
          console.log(err);
         
        }
      );
    }
    else{
      this.estado = new Estado(this.pais);
    }
  }

  cargarPaises(): void {
    this.paisService.lista().subscribe(
      data => {
        this.paises = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onCreate(): void {
    this.pais.push(this.pais1.toString()," ");
    
    if(this.id!=null){
      this.estado.setPais(new Pais(this.pais));
      this.estadoService.update(this.id, this.estado).subscribe(
        data => {
          this.estado = data;
          console.log(this.estado);
          this.router.navigate(['/contacto/estado/listarEstado']);
        },
          err => {
            console.log(err);
            });
       
    }
    else{
      this.estado.setPais(new Pais(this.pais));
    this.estadoService.save(this.estado).subscribe(
      response => {
       alert('Se inserto correctamente');
       this.router.navigate(['/contacto/estado/listarEstado']);
      },
      error =>{
        console.log(this.estado.nombreEstado);
        console.log(error);
      }
    );
    }
    }
}