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
          this.router.navigate(['/contacto/titulo/listaTitulo']);
        }
      );
    }
    
  }

  onCreate(): void {
    if(this.id!=null){
      this.tituloService.update(this.id, this.titu).subscribe(
        data => {
          this.titu = data;},
          err => {
            console.log(err);
            });
       
    }
    else{
      const titut = new Titulo(this.titulo, this.abreviatura);
    this.tituloService.save(titut).subscribe(
      response => {
        console.log(response);
      },
      error =>{
        console.log(error);
      }
    );
    }
    
    
    this.router.navigate(['/contacto/titulo/listaTitulo']);
    }
}