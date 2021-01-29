import { Empleado } from "./empleado";

   export class Departamento {
        id?: number;
        nombreDepartamento: string;
        Responsable: Empleado;
        DepartamentoPadre: Departamento;
        estado: boolean;
    
         public getDepartamento(nombreDepartamento: string, Responsable: Empleado, DepartamentoPadre: Departamento, estado: boolean){
            this.nombreDepartamento = nombreDepartamento;
            this.Responsable = Responsable;
            this.DepartamentoPadre = DepartamentoPadre;
            this.estado = estado;
        } 

        constructor(departamento : string []){
            this.id= parseInt(departamento[0]);
            this.nombreDepartamento= departamento[1];
        }

    }
    