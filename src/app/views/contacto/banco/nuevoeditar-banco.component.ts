import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Banco } from '../../../models/banco';
import { Pais } from '../../../models/pais';
import { BancoService } from '../../../service/banco.service';
import { PaisService } from '../../../service/pais.service';


@Component({
  templateUrl: 'nuevoeditar-banco.component.html'
})

export class NuevoEditarBancoComponent implements OnInit {

  banco: Banco = null;
  private id: number = this.activatedRouter.snapshot.params.id;
  paises: Pais[] = [];
  pais: string[] = [];
  pais1: number = 0;
  res: string;
  paisE: string[] = [];

  constructor(private bancoService: BancoService
    , private activatedRouter: ActivatedRoute, private route: Router
    , private paisService: PaisService, private rende2: Renderer2) { }

  ngOnInit(): void {

    if (this.id > 0) {
      this.bancoService.detail(this.id).subscribe(model => {

        this.banco = model;

        this.cargarPais();

        this.pais1 = this.banco.pais.id;

      }, err => {

        console.log('error en: ' + err.mensaje);

      })
    } else {
      this.banco = new Banco('', '', '', '', '', null, 0, '', '', false);
      this.cargarPais();
      this.pais1 = 0;
    }
  }

  onCreate(): void {
    if (this.banco.id > 0) {

      this.paisE.push(this.pais1.toString(), " ");

      this.bancoService.update(this.banco.id, new Banco(this.banco.nombre, this.banco.codigoIdenBancaria
        , this.banco.calle, this.banco.calleSecundaria, this.banco.ciudad, new Pais(this.paisE),
        this.banco.codigoPostal, this.banco.telefono, this.banco.correoElectronico, true)).subscribe(model => {

          alert('se actualizo el banco corretamente');
          this.route.navigate(['contacto/banco/listarBanco']);
        });


    } else {
      this.pais.push(this.pais1.toString(), " ");

      this.banco.setPais(new Pais(this.pais));

      this.bancoService.save(this.banco).subscribe(model => {

        this.route.navigate(['contacto/banco/listarBanco']);


      }, err => {
        console.log(err.err.mensaje);

      })
    }
  }
  onDetails() {

  }

  cargarPais(): void {
    this.paisService.lista().subscribe(model => {

      this.paises = model;

    }, err => {

      console.log(err.err.mensaje);
    })

  }
  changePais(e): void {
  }

}


