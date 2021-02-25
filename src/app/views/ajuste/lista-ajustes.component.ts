import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
    templateUrl: 'lista-ajuste.component.html'
})

export class ListaAjusteComponent implements OnInit {

    usuario: Usuario = null;

    @ViewChild('txtCorreo', { static: true }) element: ElementRef;
    @ViewChild('invitacionP', { static: true }) element2: ElementRef;

    constructor(private render: Renderer2, private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.getListUsersPending();
    }

    enviarCorreo() {

        let txtCorreo = this.element.nativeElement.value;
        this.usuario = new Usuario(null,"Prueba3", txtCorreo, "1234", new Date(), null, false,"");


        this.usuarioService.save(null).subscribe(model => {
          
                alert('Correo Enviado');

                let div = this.render.createElement("div");
                this.render.addClass(div, "col-md-4");
                let valorp = this.render.createElement("p");
                this.render.setStyle(valorp, "font-size", "11px");
                this.render.appendChild(valorp, this.render.createText(this.usuario.email));
                this.render.appendChild(div, valorp);
    
                this.render.appendChild(this.element2.nativeElement, div);
                this.element.nativeElement.value = " ";
           
        }, err => {

            alert(err.error.mensaje);
            this.element.nativeElement.value = " ";
        });
    }

    getListUsersPending() {


        this.usuarioService.listaByEstado().subscribe(model => {

            if (model.length > 0) {
                let nuevosC = "";
                for (let index = 0; index < model.length; index++) {

                    nuevosC += `<div class="col-md-4"><p style="font-size:11px;">${model[index]}</p></div>`;
                }
                this.element2.nativeElement.innerHTML = nuevosC;
            }

        }, err => {

        })

    }
}