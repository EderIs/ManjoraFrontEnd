import { Component, OnDestroy, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { TituloService } from '../../../service/titulo.service';
import { Titulo } from '../../../models/titulo';
import { Subject, Subscription } from 'rxjs';

@Component({
  templateUrl: 'lista-titulo.component.html'
})

export class listaTituloComponent implements OnInit, OnDestroy{

  titulos: Titulo[] = [];
  dtTrigger = new Subject();


  constructor(
    private tituloService: TituloService
    ) { }


  ngOnInit() {
      this.tituloService.lista().subscribe(titulos => {
       this.titulos=titulos;
       this.dtTrigger.next();
     });
    this.tituloService.lista().subscribe();
  }


  delete( id: number){
    try {
      this.tituloService.delete(id).subscribe(res => {
        this.titulos = this.titulos.filter(titulo => titulo.id !== res.id);
        alert("registro borrado!!")
      });
    } catch (error) {
       alert("error al eliminar")
      console.error(error);
    }
      
}


  ngOnDestroy(){
      this.dtTrigger.unsubscribe()
    }
    
  
}