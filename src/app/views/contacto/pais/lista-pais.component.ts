import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import  {PaisService} from '../../../service/pais.service';
import  {Pais} from '../../../models/pais';
@Component({
  templateUrl: 'lista-pais.component.html'
})

export class ListaPaisComponent implements OnInit{
  
paises : Pais[]= [];

  constructor(private paisService : PaisService){}

  ngOnInit(): void {
      this.cargarPais();    
  }
  cargarPais(): void{
    this.paisService.lista().subscribe(
      data => {
        this.paises = data;
      },
      err =>{
        console.log(err);
      }
    )
  }
delete(id:number){

if(id > 0){

  this.paisService.delete(id).subscribe(model=>{
alert('Se elimino el registro');
this.cargarPais();

  },err=>{

console.log(err.err.message);

  })

}else{
alert('no hay numero');
}


}

}