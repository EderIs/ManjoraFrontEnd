import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Contacto } from '../../models/contacto';
import { ContactoService } from '../../service/contacto.service';

@Component({
  selector: 'app-lista-contacto',
  templateUrl: 'lista-contacto.component.html'
})

export class listaContactoComponent implements OnInit{
  
  contactos: Contacto[] = [];
  constructor(private contactoService: ContactoService) { }
  


  ngOnInit(): void {
    this.cargarContactos();
  }
  cargarContactos(): void{
    this.contactoService.lista().subscribe(
      data => {
        this.contactos = data;
      },
      err =>{
        console.log(err);
      }
    )
  }

}