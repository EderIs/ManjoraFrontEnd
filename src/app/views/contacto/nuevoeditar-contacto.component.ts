import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ContactoService } from '../../service/contacto.service';
import { Contacto } from '../../models/contacto';
import { Router } from '@angular/router';
import { Estado } from '../../models/estado';
import { Titulo } from '../../models/titulo';
import { Usuario } from '../../models/usuario';

@Component({
  templateUrl: 'nuevoeditar-contacto.component.html'
})

export class nuevoEditarContactoComponent implements OnInit{
  
  nombreContacto: string ='';
    tipoContacto: boolean = null;
    fotografia: String ='';
    contacto: Contacto =null;
    calle: string ='';
    calleSecundaria: string ='';
    ciudad: string ='';
    estado: Estado =null;
    codigoPostal: number =null;
    nif: string;
    puestoTrabajo: string ='';
    telefono: string ='';
    movil: string ='';
    correoElectronico: string ='';
    sitioWeb: string ='';
    titulo: Titulo = null;
    notas: string ='';
    rol: boolean =null;
    usuario: Usuario = null;
    referenciaInterna: string ='';

  
  constructor(
    private contactoService: ContactoService,
    private router:Router
    ) { }


  ngOnInit(): void {
    
  }

  onCreate(): void {

   /*  const contacto = new Contacto(
      this.nombreContacto,
      tipoContacto: boolean = null;
      fotografia: String ='';
      contacto: Contacto =null;
      calle: string ='';
      calleSecundaria: string ='';
      ciudad: string ='';
      estado: Estado =null;
      codigoPostal: number =null;
      nif: string;
      puestoTrabajo: string ='';
      telefono: string ='';
      movil: string ='';
      correoElectronico: string ='';
      sitioWeb: string ='';
      titulo: Titulo = null;
      notas: string ='';
      rol: boolean =null;
      usuario: Usuario = null;
      referenciaInterna: string ='';
    ); */

   // this.contactoService.save(contacto).subscribe()
   /*  data => {
      this.
      

    },
    err => {

    }

    ); */
  }

}