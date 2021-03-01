import { DatePipe } from '@angular/common';
import {HoraLaboral}from './horaLaboral'

export class HorarioTrabajo{

id?:number;
nombreHorariosT:string;
diaSemana:string;
trabajarDesde:Date;
trabajarHasta:Date;
fechaInicio:Date;
fechaFinalizacion:Date;
periodoDia:string;
horasLaborales: HoraLaboral; 
/*
constructor( horarioTrabajo: string[] ){
    this.id=parseInt(horarioTrabajo[0]);
    this.nombreHorariosT=horarioTrabajo[1];
    this.diaSemana=horarioTrabajo[2];
    this.trabajarDesde=new Date(Date.parse(horarioTrabajo[3]));
    this.trabajarHasta=new Date(Date.parse(horarioTrabajo[4]));
    this.fechaInicio=new Date(Date.parse(horarioTrabajo[5]));
    this.fechaFinalizacion=new Date(Date.parse(horarioTrabajo[6]));
    this.periodoDia=horarioTrabajo[7];
}

    public getHoraLaboral():HoraLaboral{
        return this.horasLaborales;
        }
    
    public setHoraLaboral(horasLaborales:HoraLaboral):void{
        this.horasLaborales=horasLaborales;
        }

    public setHorarioTrabajo( nombreHorariosT:string,diaSemana:string,trabajarDesde:Date,
    trabajarHasta:Date,fechaInicio:Date,
    fechaFinalizacion:Date,periodoDia:string,horasLaborales: HoraLaboral ){

        this.nombreHorariosT=nombreHorariosT;
        this.diaSemana=diaSemana;
        this.trabajarDesde=trabajarDesde;
        this.trabajarHasta=trabajarHasta;
        this.fechaInicio=fechaInicio;
        this.fechaFinalizacion=fechaFinalizacion;
        this.periodoDia=periodoDia;
        this.horasLaborales=horasLaborales;
    }*/
}