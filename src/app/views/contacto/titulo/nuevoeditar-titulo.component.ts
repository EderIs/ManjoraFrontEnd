import { Component, OnInit } from '@angular/core';
import { TituloService } from '../../../service/titulo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Titulo } from '../../../models/titulo';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'nuevoeditar-titulo.component.html',
  styleUrls: ['nuevoeditar-titulo.componente.scss']
})

export class NuevoEditarTituloComponent implements OnInit{

  ferm: FormGroup;
  editMode=false;
  titulos:Titulo;
  titu: Titulo= null;
  submitted=false;

  titul: string []= [];
  
 id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private tituloService: TituloService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if (paramMap.has('id')) {
        this.editMode=true;

        const id = paramMap.get('id')

        console.log(id);

        this.tituloService.detail(paramMap.get('id')).subscribe(titulo =>{
          this.titulos = titulo;
          this.initForm();
        });
      }else{
        this.initForm();

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


initForm(){
  this.ferm = new FormGroup({
    titulo: new FormControl(this.titulos ? this.titulos.titulo : null, {
      updateOn: 'change',
      validators: [Validators.required]
    }),
    abreviatura: new FormControl(this.titulos ? this.titulos.abreviatura : null, {
      updateOn: 'change',
      validators: [Validators.required]
    }),
  });
}

submit(){
  

  if (this.ferm.invalid) {
    return alert("form inavalido")

  } else if(this.id!= null){
    this.tituloService.update(this.id, this.ferm.value).subscribe(
      data => {
        this.titu = data;
        alert('Se actualizo correctamente');
        this.router.navigate(['/contacto/titulo/listaTitulo']);
      },
        err => {
          console.log(err);
          });
        }else{
    /* const value: Titulo = {
      id: this.titulos ? this.titulos.id : null,
      ...this.ferm.value
    }  */
    
  this.tituloService.save(this.ferm.value).subscribe(
    response => {
     alert('Movimiento exitoso');
     this.router.navigate(['/contacto/titulo/listaTitulo']);
    },
    err =>{
      console.log(err);
    }
  ); 
}
  } 
  


}



/* 
import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { TituloService } from '../../../service/titulo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Titulo } from '../../../models/titulo';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'nuevoeditar-titulo.component.html',
  styleUrls: ['nuevoeditar-titulo.componente.scss']
})

export class NuevoEditarTituloComponent implements OnInit{


  tituloss: FormGroup;
  submitted=false;

  titul: string []= [];
    titu: Titulo = null;
    id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private tituloService: TituloService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    
    this.tituloss = new FormGroup({
      titulo: new FormControl( this.titu ? this.titu.titulo: null,{
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(4), Validators.pattern('^(0|[1-9][0-9]*)$')]
      }),
      abreviatura: new FormControl(this.titu ? this.titu.abreviatura: null,{
          updateOn: 'blur',
          validators: [Validators.required]
      }),


/* 
    this.tituloss = this.formBuilder.group({
      titulo: ['',Validators.required,Validators.min(4),Validators.pattern('^(0|[1-9][0-9]*)$')],
      abreviatura: ['',Validators.required] */
/*     })

    if (this.id != null){
      this.tituloService.detail(this.id).subscribe(
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
    }
  }

  get f() {return this.tituloss.controls;}

 */
/*  onSubmit(){
  this.submitted = true;
  if (this.tituloss.invalid) {
    return
  }
  alert('mensaje enviado');
}  */


 /*  onCreate(): void {
    this.submitted = true;

    if (this.tituloss.invalid) {
      return alert("form inavalido")
    }
    else if(this.id!=null){
      this.tituloService.update(this.id, this.titu).subscribe(
        data => {
          this.titu = data;
          alert('Se actualizo correctamente');
          this.router.navigate(['/contacto/titulo/listaTitulo']);
        },
          err => {
            console.log(err);
            });
       
    }
    else{ 
      
    this.tituloService.save(this.tituloss.value).subscribe(
      response => {
       alert('Se inserto correctamente');
       this.router.navigate(['/contacto/titulo/listaTitulo']);
      },
      err =>{
        console.log(err);
      }
    ); 
    }
  }
} */