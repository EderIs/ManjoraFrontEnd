import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  templateUrl: 'lista-ajuste.component.html'
})

export class ListaAjusteComponent implements OnInit{
    
usuario : Usuario=null;

@ViewChild('txtCorreo',{static:true}) element: ElementRef;
@ViewChild('invitacionP',{static:true}) element2 :ElementRef;

constructor(private render:Renderer2, private usuarioService : UsuarioService){}

    ngOnInit(): void {
        this.getListUsersPending();
    }

    enviarCorreo(){

     let txtCorreo =   this.element.nativeElement.value;    
     this.usuario = new Usuario("Prueba1",txtCorreo,"1234",new Date(),null,false);

      this.usuarioService.save(this.usuario).subscribe(model=>
        {
            alert('Correo Enviado');
            
        },err=>{

            console.log("error");
        }); 
     }   

     getListUsersPending(){

        let nuevosC = "";
        for (let index = 0; index < 6; index++) {
            
            nuevosC += `<div class="col-md-4"><p>${"Juan"+index}</p></div>`;

        }
        
        this.element2.nativeElement.innerHTML=nuevosC;

     }
}