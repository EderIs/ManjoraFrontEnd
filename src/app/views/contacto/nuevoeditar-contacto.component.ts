
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  ferm: FormGroup;
  editMode=false;
  contactos:Contacto;
  contac: Contacto= null;
  submitted=false;
  titulos: Titulo[] = [];
  titulo1: number = 0;
  titulo: string[] = [];
  estados: Estado[] = [];
  estado1: number = 0;
  estado: string[] = [];
  estadoE :string []= [];

  contal: string []= [];
  
 id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private estadoService: EstadoService,
    private tituloService: TituloService,
    private contactoService: ContactoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if (paramMap.has('id')) {
        this.editMode=true;

        const id = paramMap.get('id')

        console.log(id);

        this.contactoService.detail(paramMap.get('id')).subscribe(contactos =>{
          this.contactos = contactos;
          this.initForm();

          


        });
      }else{
        this.initForm();
        this.cargarTitulo();

        this.cargarEstado();
        //this.estado1 = this.contactos.estado.id;
        
       

      /*   if (this.id != null){
          this.tituloService.detail(paramMap.get('id')).subscribe(
            data => {
              this.titu = data;
            },
            err => {
              console.log(err);
             
            }
          );
          this.titu = new Titulo(this.titul);
        }
        else{
          this.titu = new Titulo(this.titul);
        } */
 
      }
    })
  }

  cargarTitulo(): void {
    this.tituloService.lista().subscribe(mode => {

      this.titulos = mode;

    }, err => {

      console.log(err.err.mensaje);
    })

  }

  cargarEstado(): void {
    this.estadoService.lista().subscribe(model => {

      this.estados = model;

    }, err => {

      console.log(err.err.mensaje);
    })

  }


initForm(){
  this.ferm = new FormGroup({
    nombreContacto: new FormControl(this.contactos ? this.contactos.nombreContacto : null, {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    calle: new FormControl(this.contactos ? this.contactos.calle : null, {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    /* titulo: new FormControl(this.contactos ? this.contactos.titulo : null, {
      updateOn: 'change'
    })
    , */
    calleSecundaria: new FormControl(this.contactos ? this.contactos.calleSecundaria : null, {
      updateOn: 'change',
      validators: [Validators.required]
    }),
   /*   estado: new FormControl(this.contactos ? this.contactos.estado : null, {
      updateOn: 'change'
    }) 
    , 
*/

  });
}

submit(){
  

  if (this.ferm.invalid) {
    return alert("form inavalido")

  }
  
  else if(this.id!= null){
    this.contactoService.update(this.id, this.ferm.value).subscribe(
      data => {
        this.contac = data;
        alert('Se actualizo correctamente');
        this.router.navigate(['/contacto/contacto']);
      },
        err => {
          console.log(err);
          });
        }else{
    /* const value: Titulo = {
      id: this.titulos ? this.titulos.id : null,
      ...this.ferm.value
    }  */
    /* console.log(this.titulo1);
    this.titulo1=24;
    this.titulo.push(this.titulo1.toString()," "); */
    /*  const res = this.ferm.getRawValue();
    console.log(res)
 
    var jsonVal = res.estado;
    this.estado1 = JSON.parse(jsonVal);
    console.log(this.estado1);  */
    
   //const p = 1
/* 
   this.estado.push(this.estado1.toString()," ");

    this.contactos.setEstado(new Estado(this.estado)); */

  this.contactoService.save(this.ferm.value).subscribe(
    response => {
     alert('Movimiento exitoso');
     this.router.navigate(['/contacto/contacto']);
    },
    err =>{
      console.log(err);
    }
  ); 
}
  } 
  



}






/* import { Component, OnInit, Renderer2 } from '@angular/core';
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
  public fotografia: any=File;

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

  onSelectFile(event){
    const file = event.target.files[0];
    this.fotografia=file;
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
   /*      });  

  }
  else{

    this.estado.push(this.estado1.toString()," ");
    this.titulo.push(this.titulo1.toString()," ");
    this.contacto.fotografia= this.fotografia;

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
} */ 