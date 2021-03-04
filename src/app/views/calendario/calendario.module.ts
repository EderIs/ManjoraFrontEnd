// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

//Views daugthers 
 import  {CalendarioCrear} from './calendario-crear.component';

 // Theme Routing
import  {CalendarioRoutingModule} from './calendario-routing.module';

import{ FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    FormsModule,
    ModalModule.forRoot()    
  ],
  declarations: [
    CalendarioCrear
  ]
})
export class CalendarioModule { }