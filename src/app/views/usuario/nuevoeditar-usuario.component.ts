
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-nuevoeditar-usuario',
  templateUrl: 'nuevoeditar-usuario.component.html',
  styleUrls:['nuevo-usuario.scss']
  
})

export class NuevoEditarUsuarioComponent implements OnInit{
  
    
 @ViewChild("fileImagen",{static:true}) element : ElementRef;
 @ViewChild("imagenI",{static:true}) element2 : ElementRef;


  
  constructor(
    private usuarioService: UsuarioService,
    private router:Router,
    private render : Renderer2
    ) { }


  ngOnInit(): void {
    
  }

  cargarImagen(){

    let imagen=this.element.nativeElement.value
    
     let s="https://frasesparami.com/wp-content/uploads/2017/06/imagenes-chidas-para-fondo-de-pantalla-para-celular.jpg";

      if(imagen){
      this.render.setAttribute(this.element2.nativeElement,"src",s); 
      }else{
      alert("No existe ninguna imagen");
      }   
  }

  onCreate(): void {
  
  }

}