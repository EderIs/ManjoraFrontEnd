import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { TituloService } from '../../../service/titulo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Titulo } from '../../../models/titulo';

@Component({
  templateUrl: 'nuevoeditar-titulo.component.html'
})

export class NuevoEditarTituloComponent implements OnInit{
  titul: string []= [];
    titulo: string = "";
    abreviatura: string = "";
    titu: Titulo = null;
    id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private tituloService: TituloService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    
    if (this.id != null){
      this.tituloService.detail(this.id).subscribe(
        data => {
          this.titu = data;
        },
        err => {
          console.log(err);
         
        }
      );
    }
    
  }

  onCreate(): void {
    if(this.id!=null){
      console.log(JSON.stringify(this.titu));
      this.tituloService.update(this.id, this.titu).subscribe(
        data => {
          this.titu = data;
          alert('Se inserto correctamente');
          this.router.navigate(['/contacto/titulo/listaTitulo']);
        },
          err => {
            console.log(err);
            });
       
    }
    else{
      this.titul.push(" ",this.titulo,this.abreviatura);
     const titut = new Titulo(this.titul);
    this.tituloService.save(titut).subscribe(
      response => {
       alert('Se inserto correctamente');
       this.router.navigate(['/contacto/titulo/listaTitulo']);
      },
      error =>{
        console.log(error);
      }
    ); 
    }
    } 
}