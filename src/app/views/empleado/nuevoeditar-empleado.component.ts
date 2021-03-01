import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contacto } from '../../models/contacto';
import { Empleado } from '../../models/empleado';
import { HoraLaboral } from '../../models/horaLaboral';
import { Puesto } from '../../models/puesto';
import { Usuario } from '../../models/usuario';
import { ArchivosService } from '../../service/archivos';
import { ContactoService } from '../../service/contacto.service';
import { EmpleadoService } from '../../service/empleado.service';
import { HorarioLabService } from '../../service/horario-lab.service';
import { PuestoService } from '../../service/puesto.service';
import { UsuarioService } from '../../service/usuario.service';
@Component({
  selector: 'app-nuevoeditar-empleado',
  templateUrl: 'nuevoeditar-empleado.component.html'
})

export class NuevoEditarEmpleadoComponent implements OnInit, OnDestroy{
  form: FormGroup;
  editMode=false;
  submitted=false;
  empleado:Empleado = null;
  @ViewChild("x", { static: true }) element2: ElementRef;
  @Output() imagenEventChange = new EventEmitter<String>();
  private fotografia: File;

  puestos: Puesto[] = [];
  puesto: string[] = [];

  direccionesTrabajo: Contacto[] = [];
  direccionTrabajo: string[] = [];
/*
  responsables: Empleado[] = [];
  responsable: string[] = [];

  monitores: Empleado[] = [];
  monitor: string[] = [];
*/
  horasLaboraless: HoraLaboral[] = [];
  horasLaborales: string[] = [];

  usuarios: Usuario[] = [];
  usuario: string[] = [];
  
 id: number = this.activatedRoute.snapshot.params.id;
  
 finishObservable: Subscription;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private contactoService: ContactoService,
    private puestoService: PuestoService,
    private horaLabService: HorarioLabService,
    private usuarioService: UsuarioService,
    private render: Renderer2,
    private archivosService: ArchivosService,
    ) { }
  
  ngOnInit(): void {
    this.cargarContacto();
    this.cargarPuesto();
    //this.cargarResponsable();
    this.cargarHorasLab();
    this.cargarUsuario();
    //this.cargarMonitor();
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if (paramMap.has('id')) {
        this.editMode=true;
        const id = paramMap.get('id')
        console.log(id);
        this.empleadoService.detail(parseInt(paramMap.get('id'))).subscribe(emple =>{
          this.empleado = emple;
          if (this.empleado.fotografia != "Ninguna") {
            this.archivosService.uploadImagen(this.empleado.fotografia).subscribe(model => {
              let url = window.URL.createObjectURL(model);
            }, err => {
              console.log(err)
            });
          }
          this.initForm();
        });
      }else{
        this.empleado = new Empleado();
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

      this.fotografia = imagen[0];
    } else {
      this.fotografia = null;
    }
   this.changeNameServidor(this.fotografia);
  }

  initForm(){
    this.form = new FormGroup({
      nombreEmpleado: new FormControl(this.empleado ? this.empleado.nombreEmpleado : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      direccionPrivada: new FormControl(this.empleado ? this.empleado.direccionPrivada : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),
      
      categoria: new FormControl(this.empleado ? this.empleado.categoria : null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      
      tituloTrabajo: new FormControl(this.empleado ? this.empleado.tituloTrabajo : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      contactoEmergencia: new FormControl(this.empleado ? this.empleado.contactoEmergencia : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      telefonoEmergencia: new FormControl(this.empleado ? this.empleado.telefonoEmergencia : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[0-9]{10}')]
      }),

      kmCasaTrabajo: new FormControl(this.empleado ? this.empleado.kmCasaTrabajo : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[0-9]')]
      }),

      sexo: new FormControl(this.empleado ? this.empleado.sexo: null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),

      estadoCivil: new FormControl(this.empleado ? this.empleado.estadoCivil: null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),

      numeroHijos: new FormControl(this.empleado ? this.empleado.numeroHijos : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('[0-9]')]
      }),

      fechaNacimiento: new FormControl(this.empleado ? this.empleado.fechaNacimiento : null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),

      lugarNacimiento: new FormControl(this.empleado ? this.empleado.lugarNacimiento : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      nivelCertificado: new FormControl(this.empleado ? this.empleado.nivelCertificado : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      escuela: new FormControl(this.empleado ? this.empleado.escuela : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      notaAdicional: new FormControl(this.empleado ? this.empleado.notaAdicional : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      nota: new FormControl(this.empleado ? this.empleado.nota : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$')]
      }),

      estado: new FormControl(this.empleado ? this.empleado.estado: null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),

      puesto: new FormGroup({
        id: new FormControl(this.empleado ? this.empleado.puesto: null,{
          updateOn: 'change',
          validators: [Validators.required]
        }),
        
      }),

      horasLaborales: new FormGroup({
        id: new FormControl(this.empleado ? this.empleado.horasLaborales: null,{
          updateOn: 'change',
          validators: [Validators.required]
        }),
          
      }),

      usuario: new FormGroup({
        id: new FormControl(this.empleado ? this.empleado.usuario: null,{
          updateOn: 'change',
          validators: [Validators.required]
        }),
        
      }),
             
      direccionTrabajo: new FormGroup({
        id: new FormControl(this.empleado ? this.empleado.direccionTrabajo: null,{
          updateOn: 'change',
          //validators: [Validators.required]
        }),
        
         }),
/*
            responsable: new FormGroup({
              id: new FormControl(this.empleado ? this.empleado.idResponsable.id: null,{
                updateOn: 'change',
              }),
              
               }),

               monitor: new FormGroup({
                id: new FormControl(this.empleado ? this.empleado.idMonitor.id: null,{
                  updateOn: 'change',
                }),
                
                 }),
*/                   
    });
  }

  cargarContacto(): void {
    this.contactoService.lista().subscribe(
      data => {
        this.direccionesTrabajo = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarPuesto(): void {
    this.puestoService.fetchPuestos().subscribe(
      data => {
        this.puestos = data;
      },
      err => {
        console.log(err);
      }
    );
  }
/*
  cargarResponsable(): void {
    this.empleadoService.lista().subscribe(
      data => {
        this.responsables = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarMonitor(): void {
    this.empleadoService.lista().subscribe(
      data => {
        this.monitores = data;
      },
      err => {
        console.log(err);
      }
    );
  }
*/
  cargarHorasLab(): void {
    this.horaLabService.lista().subscribe(
      data => {
        this.horasLaboraless = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarUsuario(): void {
    this.usuarioService.lista().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  

  submit(){
  
    if (this.form.invalid) {
      return alert("form inavalido")
  
    }
    
    else if(this.id!= null){
      if(this.fotografia !=null && this.fotografia.name != this.empleado.fotografia){
        let formData1 = new FormData();
        formData1.append("imagenU", this.fotografia,this.changeNameServidor(this.fotografia));
         this.archivosService.updateImagen(this.empleado.fotografia, formData1).subscribe(model => {
           this.empleado = this.form.value;
          this.empleado.fotografia = model.mensaje

          this.empleadoService.update(this.id, this.empleado).subscribe(model => {
            this.changeImagenUpdate(this.empleado.fotografia);
            alert(model.mensaje);
            this.router.navigate(['/empleado/empleado']);
          }, err => {
            alert(err.error.mensaje);
          }); 
        }, err => {
          console.log(err.error.mensaje);
        });
      }else{
        this.empleado = this.form.value
        this.empleadoService.update(this.id, this.empleado).subscribe(model => {
          alert(model.mensaje);
          this.router.navigate(['/empleado/empleado']);
        }, err => {
          alert(err.error.mensaje);
        });
      }
    } else {
      if (this.fotografia != null) {
        let formData1 = new FormData();

        formData1.append("imagen", this.fotografia,this.changeNameServidor(this.fotografia));

        this.finishObservable = this.archivosService.saveImagen(formData1).subscribe(model => {

          let path = model.mensaje;

          if (this.empleado != null) {
            this.empleado = this.form.value;
            this.empleado.fotografia = path;
            this.empleadoService.save(this.empleado).subscribe(model => {
              alert(model.mensaje);
              this.router.navigate(['/empleado/empleado']);
            }, err => {
              alert(err.error.mensaje);
            });
          }
        });
      } else {
        if (this.empleado != null) {
          this.empleado = this.form.value;
          this.empleado.fotografia = "Ninguna";
          this.empleadoService.save(this.empleado).subscribe(model => {
            alert(model.mensaje);
            this.router.navigate(['/empleado/empleado']);
          }, err => {
            alert(err.error.mensaje);
          });
        }
      }
    }
    } 
    
    changeNameServidor(nombreArchivo : File): string{

      let modificador = nombreArchivo.name.split('.');
  
      let nR = Math.round(Math.random() * 100);
      
      let nuevoNombre = modificador[0]+nR+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+"."+modificador[1];
  
      return nuevoNombre;
    }

    changeImagenUpdate(nombrePath : String){
      let idUserActive = parseInt(window.sessionStorage.getItem("ValueUs"));
    if(this.id == idUserActive){
      this.imagenEventChange.emit(window.URL.createObjectURL(nombrePath));
    }
    }
  }

