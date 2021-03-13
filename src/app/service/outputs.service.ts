import { Injectable, Output } from '@angular/core';
import {EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutputsService {

@Output() disparador : EventEmitter<any> = new EventEmitter<any>();

@Output() disparadorNot : EventEmitter<any> = new EventEmitter<any>();

@Output() diparadorLogin : EventEmitter<any>  = new EventEmitter<any>();

constructor(){}

}
