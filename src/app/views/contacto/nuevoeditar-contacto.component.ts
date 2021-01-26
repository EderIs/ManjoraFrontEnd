
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ContactoService } from '../../service/contacto.service';
import { Contacto } from '../../models/contacto';
import { Router } from '@angular/router';
import { Estado } from '../../models/estado';
import { Titulo } from '../../models/titulo';
import { Usuario } from '../../models/usuario';
import { Pais } from '../../models/pais';

@Component({
  selector: 'app-nuevoeditar-contacto',
  templateUrl: 'nuevoeditar-contacto.component.html'
})

export class nuevoEditarContactoComponent implements OnInit{
  
    estado: Estado = null;
    nombreContacto: string ='';
    tipoContacto: boolean = null;
    fotografia:string='';
    contacto: Contacto =null;
    calle: string ='';
    calleSecundaria: string ='';
    ciudad: string ='';
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
     const contacto = new Contacto(
      this.nombreContacto,
      this.tipoContacto,
      this.fotografia,
      this.contacto,
      this.calle,
      this.calleSecundaria,
      this.ciudad,
      this.estado,
      this.codigoPostal,
      this.nif,
      this.puestoTrabajo,
      this.telefono,
      this.movil,
      this.correoElectronico,
      this.sitioWeb,
      this.titulo,
      this.notas,
      this.rol,
      this.usuario,
      this.referenciaInterna,
    ); 

   this.contactoService.save(contacto).subscribe(
     data => {
      
      alert('se guardo el contacto');

    },
    err => {
      alert('No se guardo el contacto' +  err.error.mensaje);
    }

    ); 
  }

}