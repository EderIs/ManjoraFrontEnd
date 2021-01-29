export class HoraLaboral{

    id?:number;
    nombreHoraL:string;
    promedioHoraDia:number;
   
   
    constructor(horaL : string []){
        this.id= parseInt(horaL[0]);
        this.nombreHoraL= horaL[1];
        this.promedioHoraDia= parseFloat(horaL[2]);
    }

    public setHoraLaboral(nombreHoraL: string, promedioHoraDia:number){
        this.nombreHoraL = nombreHoraL;
        this.promedioHoraDia = promedioHoraDia;
    }

    public getHoraLaboral(nombreHoraL: string){
        this.nombreHoraL = nombreHoraL;
    }
   }