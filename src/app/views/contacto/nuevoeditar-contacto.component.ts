
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { EstadoService } from '../../service/estado.service';
import { ContactoService } from '../../service/contacto.service';
import { Contacto } from '../../models/contacto';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../../models/estado';
import { TituloService } from '../../service/titulo.service';
import { Titulo } from '../../models/titulo';



@Component({
  templateUrl: 'nuevoeditar-contacto.component.html',
})

export class nuevoEditarContactoComponent implements OnInit {

  estados: Estado[] = [];
  titulos: Titulo[] = [];
  contacto: Contacto = null;
  estado: string[] = [];
  titulo: string[] = [];
  estado1: number = 0;
  titulo1: number = 0;
  id: number = this.activatedRoute.snapshot.params.id;
  res:string;
  estadoE :string []= [];
  tituloE :string []= [];
  constructor(
    private estadoService: EstadoService,
    private tituloService: TituloService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactoService: ContactoService,
    private rende2:Renderer2,
  ) { }


  ngOnInit(): void {
    this.cargarEstado();
    this.cargarTitulo();
    if (this.id > 0) {
      this.contactoService.detail(this.id).subscribe(model => {

        this.contacto = model;

        this.cargarEstado();
        this.estado1 = this.contacto.estado.id;

        this.cargarTitulo();
        this.titulo1 = this.contacto.titulo.id;


      }, err => {

        console.log('error en: ' + err.error.message);

      })
    } else {
      this.contacto = new Contacto('', false, '', null, '', '', '', null, 0, '', '', '', '', '', '', null, '', false, null, '');
      this.cargarEstado();
    }
  }

  cargarEstado(): void {
    this.estadoService.lista().subscribe(model => {

      this.estados = model;

    }, err => {

      console.log(err.err.mensaje);
    })

  }

  cargarTitulo(): void {
    this.tituloService.lista().subscribe(mode => {

      this.titulos = mode;

    }, err => {

      console.log(err.err.mensaje);
    })

  }

  onDetails() { }

  onCreate(): void {

    if (this.contacto.id > 0) {
    this.estadoE.push(this.estado1.toString(), " ");
    this.tituloE.push(this.titulo1.toString(), " ");
   
      this.contactoService.update(this.contacto.id,new Contacto(this.contacto.nombreContacto,
        this.contacto.tipoContacto,this.contacto.fotografia,this.contacto.contacto,
        this.contacto.calle,this.contacto.calleSecundaria,this.contacto.ciudad,new Estado(this.estadoE),
        this.contacto.codigoPostal,this.contacto.nif,this.contacto.puestoTrabajo,this.contacto.telefono,this.contacto.movil,
        this.contacto.correoElectronico,this.contacto.sitioWeb,new Titulo(this.tituloE),this.contacto.notas,
        this.contacto.rol,this.contacto.usuario,this.contacto.referenciaInterna,)).subscribe( model => {

          alert('se actualizo el contacto corretamente');
          this.router.navigate(['/contacto/contacto']);

          

         /*  this.contacto = data;
          console.log(this.contacto);
          
        },
        err => {
          console.log(err); */
        });  

  }
  else{

    this.estado.push(this.estado1.toString()," ");
    this.titulo.push(this.titulo1.toString()," ");

    this.contacto.setEstado(new Estado(this.estado));
    this.contacto.setTitulo(new Titulo(this.titulo));

  this.contactoService.save(this.contacto).subscribe(
    model => {
     alert('Se inserto correctamente');
     this.router.navigate(['/contacto/contacto']);
    },
    error =>{
      console.log(error);
      console.log(error.error.mensaje);
      alert('no se pudo agregar contacto')
    }
  );
  }

}
}