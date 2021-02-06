import { Empleado } from "./empleado";

   export class Departamento {
        id?: number;
        nombreDepartamento: string;
        empleado: Empleado;
        departamentoPadre: Departamento;
        estado: boolean;
    
         public setDepartamento(nombreDepartamento: string, empleado: Empleado, departamentoPadre: Departamento, estado: boolean){
            this.nombreDepartamento = nombreDepartamento;
            this.empleado = empleado;
            this.departamentoPadre = departamentoPadre;
            this.estado = estado;
        } 

        constructor(departamento : string []){
            this.id= parseInt(departamento[0]);
            this.nombreDepartamento= departamento[1];
        }

        public getEmpleado():Empleado{
            return this.empleado;
            }
        
            public setEmpleado(empleado:Empleado):void{
            this.empleado=empleado;
            }
    }
    