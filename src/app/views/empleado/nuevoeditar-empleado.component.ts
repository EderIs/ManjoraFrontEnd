
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from '../../models/contacto';
import { Empleado } from '../../models/empleado';
import { HoraLaboral } from '../../models/horaLaboral';
import { Puesto } from '../../models/puesto';
import { Usuario } from '../../models/usuario';
import { ContactoService } from '../../service/contacto.service';
import { EmpleadoService } from '../../service/empleado.service';
import { HorarioLabService } from '../../service/horario-lab.service';
import { PuestoService } from '../../service/puesto.service';
import { UsuarioService } from '../../service/usuario.service';
@Component({
  selector: 'app-nuevoeditar-empleado',
  templateUrl: 'nuevoeditar-empleado.component.html'
})

export class NuevoEditarEmpleadoComponent implements OnInit{
  empleado: Empleado = null;
  fotografia: File;
  imagenMin: File;

  direccionesTrab: Contacto[] = [];
  direccionTrab : string [] =[];
  direccionTrab1 : number = 0; 

  puestos: Puesto[] = [];
  puesto : string [] =[];
  puesto1 : number = 0;

  responsables: Empleado[] = [];
  responsable : string [] =[];
  responsable1 : number = 0;

  monitores: Empleado[] = [];
  monitor : string [] =[];
  monitor1 : number = 0;

  horasLab: HoraLaboral[] = [];
  horaLab : string [] =[];
  horaLab1 : number = 0;

  usuarios: Usuario[] = [];
  usuario : string [] =[];
  usuario1 : number = 0;

  id: number = this.activatedRoute.snapshot.params.id;
  
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoService,
    private contactoService: ContactoService,
    private puestoService: PuestoService,
    private horaLabService: HorarioLabService,
    private usuarioService: UsuarioService
    ) { }
  
  ngOnInit(): void {
    this.cargarContacto();
    this.cargarPuesto();
    this.cargarResponsable();
    this.cargarHorasLab();
    this.cargarUsuario();
    this.cargarMonitor();
    if (this.id != null){
      this.empleadoService.detail(this.id).subscribe(
        data => {
          this.empleado = data;
          console.log(this.empleado);
          this.direccionTrab1 = data.direccionTrabajo.id;
          this.puesto1 = data.idPuesto.id;
          this.responsable1 = data.idResponsable.id;
          this.monitor1 = data.idMonitor.id;
          this.horaLab1 = data.horasLaborales.id;
          this.usuario1 = data.idUsuario.id;
        },
        err => {
          console.log(err);
         
        }
      );
      this.empleado = new Empleado(this.horaLab);
    }
    else{
      this.empleado = new Empleado(this.horaLab);
    }
  }

  onFileChange(event) {
    this.fotografia = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.fotografia);
  }

  cargarContacto(): void {
    this.contactoService.lista().subscribe(
      data => {
        this.direccionesTrab = data;
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

  cargarHorasLab(): void {
    this.horaLabService.lista().subscribe(
      data => {
        this.horasLab = data;
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

  onCreate(): void {
    this.direccionTrab.push(this.direccionTrab1.toString(),"");
    this.puesto.push(this.puesto1.toString(),"");
    this.responsable.push(this.responsable1.toString(),"");
    this.monitor.push(this.monitor1.toString(),"");
    this.horaLab.push(this.horaLab1.toString(),"");
    this.usuario.push(this.usuario1.toString(),"");
    if(this.id!=null){
      this.empleado.direccionTrabajo.id = this.direccionTrab1;
      this.empleado.idPuesto.id = this.puesto1;
      this.empleado.idResponsable.id = this.responsable1;
      this.empleado.idMonitor.id = this.monitor1;
      this.empleado.horasLaborales.id = this.horaLab1;
      this.empleado.idUsuario.id = this.usuario1;
      this.empleadoService.update(this.id, this.empleado).subscribe(
        data => {
          this.empleado = data;
          console.log(this.empleado);
        },
          err => {
            console.log(err);
            console.log(this.empleado);
            });
    }
    else{
      //this.empleado.setPuesto(new Puesto(this.puesto));
      this.empleado.setResponsable(new Empleado(this.responsable));
      this.empleado.setMonitor(new Empleado(this.monitor));
      //this.empleado.setDirecciontrabajo(new Contacto(this.direccionTrab));
      this.empleado.setHorasLaborales(new HoraLaboral(this.horaLab));
      //this.empleado.setUsuario(new Usuario(this.usuario));
      this.empleadoService.save(this.empleado).subscribe(
        response => {
          console.log(this.empleado);
        alert('Se inserto correctamente');

        },
        error =>{
          console.log(error);
        }
      );
    }
    this.router.navigate(['/empleado/horarioT/listarHorarioT']);
  }

}