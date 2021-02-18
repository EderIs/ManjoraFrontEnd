export class Imagen {
    id?: number;
    name: string;
    imagenUrl: string;
    imagenId: string;

    constructor(imagen:string[]){
        this.id = parseInt(imagen[0]);
        this.name = imagen[1];
        this.imagenUrl = imagen[2];
        this.imagenId = imagen[3];
    }

    setImagen(name: string, imagenUrl: string, imagenId: string ) {
        this.name = name;
        this.imagenUrl = imagenUrl;
        this.imagenUrl = imagenId;
    }
}
