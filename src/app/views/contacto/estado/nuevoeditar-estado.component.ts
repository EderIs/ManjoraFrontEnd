import { Component, OnInit } from '@angular/core';
import { Pais } from '../../../models/pais';
import { PaisService } from '../../../service/pais.service';
import { EstadoService } from '../../../service/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../../../models/estado';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'nuevoeditar-estado.component.html'
})

export class NuevoEditarEstadoComponent implements OnInit {

  ferm: FormGroup;
  editMode = false;
  estados: Estado = null;
  estad: Estado = null;
  paises: Pais[] = [];
  pais: string[] = [];
  id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private estadoService: EstadoService,
    private paisService: PaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarPais();

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;

        this.estadoService.detail(paramMap.get('id')).subscribe(estados => {
          this.estados = estados;
          this.initForm();
        });
      }
      else {
        this.initForm();
      }
    })
  }

  cargarPais(): void {
    this.paisService.lista().subscribe(mode => {
      this.paises = mode;
    }, err => {
      console.log(err.err.mensaje);
    })
  }



  initForm() {
    this.ferm = new FormGroup({
      nombreEstado: new FormControl(
        this.estados ? this.estados.nombreEstado : null, {
        updateOn: 'change',
        validators: [Validators.required]
      }
      ),
      codigo: new FormControl(
        this.estados ? this.estados.codigo : null, {
        updateOn: 'change',
        validators: [Validators.required]
      }
      ),
      pais: new FormGroup({
        id: new FormControl(
          this.estados ? this.estados.pais.id : null, {
          updateOn: 'change',
          validators: [Validators.required]
        }
        ),

      }),
    });
  }

  submit() {
    if (this.ferm.invalid) {
      return alert("form inavalido")
    }
    else if (this.id != null) {
      this.estadoService.update(this.id, this.ferm.value).subscribe(
        data => {
          this.estad = data;
          alert('Se actualizo correctamente');
          this.router.navigate(['/contacto/estado/listarEstado']);
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.estadoService.save(this.ferm.value).subscribe(
        response => {

          alert('Movimiento exitoso');
          this.router.navigate(['/contacto/estado/listarEstado']);
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}




