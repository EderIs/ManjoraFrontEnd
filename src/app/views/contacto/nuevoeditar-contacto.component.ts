import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from '../../service/estado.service';
import { ContactoService } from '../../service/contacto.service';
import { Contacto } from '../../models/contacto';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../../models/estado';
import { TituloService } from '../../service/titulo.service';
import { Titulo } from '../../models/titulo';
import { Subscription } from 'rxjs';
import { ArchivosService } from '../../service/archivos';

@Component({
  templateUrl: 'nuevoeditar-contacto.component.html',
  styleUrls: ['nuevoeditar-contacto.component.scss'],
})

export class nuevoEditarContactoComponent implements OnInit, OnDestroy {

  @Output() imagenEventChange = new EventEmitter<String>();
  @ViewChild("imagenI", { static: true }) element2: ElementRef;
  finishObservable: Subscription;
  private imagenCargar: File;
  ferm: FormGroup;
  editMode = false;
  selectedImage: File;
  contactos: Contacto ;
  contac: Contacto = null;
  titulos: Titulo[] = [];
  titulo: string[] = [];
  estados: Estado[] = [];
  estado: string[] = [];

   id: number = (this.activatedRoute.snapshot.params.id > 0) ? this.activatedRoute.snapshot.params.id : 0;
  //id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private estadoService: EstadoService,
    private tituloService: TituloService,
    private contactoService: ContactoService,
    private archivosService: ArchivosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private render: Renderer2,
  ) { }

  ngOnInit(): void {
    this.cargarEstado();
    this.cargarTitulo();

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;


        this.contactoService.detail(paramMap.get('id')).subscribe(contactos => {
          this.contactos = contactos;
          if (this.contactos.pathImagen != "Ninguna") {
            this.archivosService.uploadImagen(this.contactos.pathImagen).subscribe(model => {
              let url = window.URL.createObjectURL(model);
              this.render.setAttribute(this.element2.nativeElement, "src", url);
            }, err => {
              console.log(err)
            });
          }
          this.initForm();
        });
      }
      else {
 
        this.initForm();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.finishObservable != null) {
      this.finishObservable.unsubscribe();
    }

  }

  cargarImagen(event) {

    let imagen = event.target.files;

    let url = window.URL.createObjectURL(imagen[0]);

    this.render.setAttribute(this.element2.nativeElement, "src", url);

    if (imagen.length > 0) {

      this.imagenCargar = imagen[0];
    } else {
      this.imagenCargar = null;
    }
    this.changeNameServidor(this.imagenCargar);
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
        validators: [Validators.required, Validators.pattern('^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ]+$')]
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
        validators: [Validators.required, Validators.pattern('[0-9]{5}')]
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
        validators: [Validators.required, Validators.pattern('^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ]+$')]
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

  onFileChanged(event: Event) {
    this.selectedImage = (event.target as HTMLInputElement).files[0];
  }

  submit() {

    if (this.ferm.invalid) {
      return alert("form inavalido")
    }
    else if (this.id > 0 && this.id !=null) {
      if (this.imagenCargar != null  ) {
        let formData1 = new FormData();
        formData1.append("imagenU", this.imagenCargar, this.changeNameServidor(this.imagenCargar));
        this.archivosService.updateImagen(this.contactos.pathImagen, formData1).subscribe(model => {
          this.contactos= this.ferm.value;
          this.contactos.pathImagen = model.mensaje

          this.contactoService.update(this.id, this.contactos).subscribe(data => {
            this.changeImagenUpdate(this.contactos.pathImagen);
            alert(data.mensaje);
            this.contac = data;
            alert('Se actualizo correctamente');
            this.router.navigate(['/contacto/contacto']);
          }, err => {
            alert(err.error.mensaje);
            console.log(err);
          });
        }, err => {
          console.log(err.error.mensaje);
        });

      } else {
        this.contactos= this.ferm.value;
        this.contactoService.update(this.id, this.contactos).subscribe(model => {
          alert(model.mensaje);
          this.router.navigate(['/contacto/contacto']);
        }, err => {
          alert(err.error.mensaje);
        });
      }
    } else {
      if (this.imagenCargar != null) {
        let formData1 = new FormData();

        formData1.append("imagen", this.imagenCargar, this.changeNameServidor(this.imagenCargar));

        this.archivosService.saveImagen(formData1).subscribe(model => {

          let path = model.mensaje;

          if (this.contactos != null) {
            this.contactos= this.ferm.value;
            this.contactos.pathImagen = path;
            this.contactos.fechaCreacion = new Date();
            

            this.contactoService.save(this.contactos).subscribe(model => {
              alert(model.mensaje);
              this.router.navigate(['/contacto/contacto']);
            }, err => {
              alert(err.error.mensaje);
            });
          }
        });
      } else {
        if (this.contactos != null) {
          this.contactos.fechaCreacion = new Date();
          this.contactos= this.ferm.value;
          this.contactos.pathImagen = "Ninguna";
          
          this.contactoService.save(this.contactos).subscribe(
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
  }

  changeImagenUpdate(nombrePath : String){
    let idUserActive = parseInt(window.sessionStorage.getItem("ValueUs"));
    if(this.id == idUserActive){
      this.imagenEventChange.emit(window.URL.createObjectURL(nombrePath));
    }
  }



  changeNameServidor(nombreArchivo: File): string {

    let modificador = nombreArchivo.name.split('.');

    let nR = Math.round(Math.random() * 100);

    let nuevoNombre = modificador[0] + nR + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + "." + modificador[1];

    return nuevoNombre;
  }
  
}

