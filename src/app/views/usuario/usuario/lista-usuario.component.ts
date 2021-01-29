
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-lista-contacto',
  templateUrl: 'lista-usuario.component.html'
})

export class ListaUsuarioComponent implements OnInit{
    
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}