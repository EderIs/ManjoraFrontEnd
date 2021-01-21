import { Empleado } from "./empleado";

   export class Departamento {
        id?: number;
        nombreDepartamento: string;
        Responsable: Empleado;
        DepartamentoPadre: Departamento;
        estado: boolean;
    
        constructor(nombreDepartamento: string, Responsable: Empleado, DepartamentoPadre: Departamento, estado: boolean){
            this.nombreDepartamento = nombreDepartamento;
            this.Responsable = Responsable;
            this.DepartamentoPadre = DepartamentoPadre;
            this.estado = estado;
        }
    }
    