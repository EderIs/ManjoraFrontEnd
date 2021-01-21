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
horaLaboral: HoraLaboral; 

constructor( nombreHorariosT:string,diaSemana:string,trabajarDesde:Date,
    trabajarHasta:Date,fechaInicio:Date,
    fechaFinalizacion:Date,periodoDia:string,horaLaboral: HoraLaboral ){

        this.nombreHorariosT=nombreHorariosT;
        this.diaSemana=diaSemana;
        this.trabajarDesde=trabajarDesde;
        this.trabajarHasta=trabajarHasta;
        this.fechaInicio=fechaInicio;
        this.fechaFinalizacion=fechaFinalizacion;
        this.periodoDia=periodoDia;
        this.horaLaboral=horaLaboral;
    }
}