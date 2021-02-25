import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Pais } from '../../../models/pais'
import { PaisService } from '../../../service/pais.service'


@Component({
  templateUrl: 'nuevoeditar-pais.component.html'
})

export class NuevoEditarPaisComponent implements OnInit {

  ferm: FormGroup;
  editMode = false;
  paises: Pais;
  pai: Pais = null;
  id: number = this.activatedRoute.snapshot.params.id;

  constructor(
    private paisService: PaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;

        this.paisService.detail(paramMap.get('id')).subscribe(paises => {
          this.paises = paises;
          this.initForm();
        });
      }
      else {
        this.initForm();
      }
    })
  }

  initForm() {
    this.ferm = new FormGroup({
      nombrePais: new FormControl(this.paises ? this.paises.nombrePais : null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
    });
  }

  submit() {
    if (this.ferm.invalid) {
      return alert("form inavalido")
    }
    else if (this.id != null) {
      this.paisService.update(this.id, this.ferm.value).subscribe(
        data => {
          this.pai = data;
          alert('Se actualizo correctamente');
          this.router.navigate(['/contacto/pais/listarPais']);
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.paisService.save(this.ferm.value).subscribe(
        response => {
          alert('Movimiento exitoso');
          this.router.navigate(['/contacto/pais/listarPais']);
        },
        err => {
          console.log(err);
        }
      );
    }

  }

}
