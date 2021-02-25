import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  editMode = false;
  selectedImage: File;
  contactos: Contacto = null;
  contac: Contacto= null;
  titulos: Titulo[] = [];
  titulo: string[] = [];
  estados: Estado[] = [];
  estado: string[] = [];
  id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private estadoService: EstadoService,
    private tituloService: TituloService,
    private contactoService: ContactoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarEstado();
    this.cargarTitulo();


    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;

        this.contactoService.detail(paramMap.get('id')).subscribe(contactos => {
          this.contactos = contactos;
          this.initForm();
        });
      }
      else {
        this.initForm();
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


  initForm() {
    this.ferm = new FormGroup({
      
     
      nombreContacto: new FormControl(
        this.contactos ? this.contactos.nombreContacto : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }
      ),
      calle: new FormControl(
        this.contactos ? this.contactos.calle : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ]+$') ]
      }
      ),
      calleSecundaria: new FormControl(
        this.contactos ? this.contactos.calleSecundaria : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-z0-9/\ÁÉÍÓÚáéíóúñÑ ]+$')]
      }
      ),

      ciudad: new FormControl(
        this.contactos ? this.contactos.ciudad : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }
      ),

      codigoPostal: new FormControl(
        this.contactos ? this.contactos.codigoPostal : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[0-9]{5}') ]
      }
      ),
      nif: new FormControl(
        this.contactos ? this.contactos.nif : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[0-9]{13}')]
      }
      ),
      puestoTrabajo: new FormControl(
        this.contactos ? this.contactos.puestoTrabajo : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }
      ),
      telefono: new FormControl(
        this.contactos ? this.contactos.telefono : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[0-9]{10}')]
      }
      ),
      movil: new FormControl(
        this.contactos ? this.contactos.movil : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[0-9]{10}')]
      }
      ),
      correoElectronico: new FormControl(
        this.contactos ? this.contactos.correoElectronico : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
      }
      ),
      sitioWeb: new FormControl(
        this.contactos ? this.contactos.sitioWeb : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$')] 
      }
      ),
      notas: new FormControl(
        this.contactos ? this.contactos.notas : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ]+$') ]
      }
      ),

      estado: new FormGroup({
        id: new FormControl(
          this.contactos ? this.contactos.estado.id : null, {
          updateOn: 'change',
          validators: [Validators.required]
        }
        ),

      }),

      titulo: new FormGroup({
        id: new FormControl(
          this.contactos ? this.contactos.titulo.id : null, {
          updateOn: 'change',
          validators: [Validators.required]
        }
        ),

      }),
    });
  }

   onFileChanged(event: Event){
      this.selectedImage = (event.target as HTMLInputElement).files[0];
   }

  submit() {
    
    if (this.ferm.invalid) {
      return alert("form inavalido")
    }
    else if (this.id != null) {
            this.contactoService.update(this.id,this.ferm.value).subscribe(
        data => {
          this.contac = data;
          alert('Se actualizo correctamente');
          this.router.navigate(['/contacto/contacto']);
        },
        err => { 
          console.log(err);
        });

    }
    else {
      this.contactoService.save(this.ferm.value).subscribe(
        response => {

          alert('Movimiento exitoso');
          this.router.navigate(['/contacto/contacto']);
        },
        err => {
          console.log(err);
        }
      );
    } 
  }
}
