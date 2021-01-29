import { Departamento } from "./departamento";

export class Puesto {
    id?: number;
    nombrePuesto: string;
    departamento: Departamento;
    descripcionTrabajo: String;

    constructor(nombrePuesto: string, departamento: Departamento, descripcionTrabajo: String){
        this.nombrePuesto = nombrePuesto;
        this.departamento = departamento;
        this.descripcionTrabajo = descripcionTrabajo;
    }

    public getDepartamento():Departamento{
        return this.departamento;
        }
        public setDepartamento(departamento:Departamento):void{
            
        this.departamento=departamento;
        }

}