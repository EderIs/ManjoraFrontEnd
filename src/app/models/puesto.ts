import { Departamento } from "./departamento";

export class Puesto {
    id?: number;
    nombrePuesto: String;
    idDepartamento: Departamento;
    descripcionTrabajo: String;

    constructor(nombrePuesto: string, idDepartamento: Departamento, descripcionTrabajo: String){
        this.nombrePuesto = nombrePuesto;
        this.idDepartamento = idDepartamento;
        this.descripcionTrabajo = descripcionTrabajo;
    }
}