import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DefaultLayoutComponent } from '../../containers';
import { Calendario } from '../../models/calendario';
import { CalendarioBase } from '../../models/calendarioBase';
import { Contacto } from '../../models/contacto';
import { CalendarioService } from '../../service/calendarioService';
import { ContactoService } from '../../service/contacto.service';

@Component({
  selector: 'app-Crea-Calendario',
  templateUrl: 'calendario-crear.component.html',
  styleUrls: ['calendario-crear.scss']
})

export class CalendarioCrear implements OnInit {

  @ViewChild('largeModal') public largeModal: ModalDirective;
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  ar: Array<any> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  startDay: any;
  count = 0;
  arrayd: Array<any> = [{
    name: '',
    value: '',
    indexWeek: ''
  }]

  numDias: Number = 0;
  getSem1: Array<any> = [];
  public fecha: string = "";
  mes: string = "";
  anio: string = "";
  calendario: CalendarioBase[];
  eventos: CalendarioBase[] = [];
  idUser: number = parseInt(window.sessionStorage.getItem("ValueUs"));
  calendarioBase: CalendarioBase = null;
  contactos: Contacto[] = [];
  contactosSel: any = new Map<number, String>();
  ids: number[] = [];
  idContacto: number = 0;

  constructor(private render: Renderer2,
    private calendarioService: CalendarioService,
    private contactoService: ContactoService) { }

  ngOnInit(): void {

    this.mes = (parseInt(new Date().getMonth().toString()) + 1).toString();
    this.anio = new Date().getFullYear().toString();
    this.fecha = this.meses[parseInt(this.mes) - 1] + " " + this.anio;
    this.dividirSemanas(this.getDatesFromDays(this.mes, this.anio));
    this.calendarioBase = new CalendarioBase(0, "Nuevo Evento", null, null, null, []);
    this.contactoService.detailIdContacto(this.idUser).subscribe(model => {
      this.idContacto = model;
      return this.idContacto;
    });
  }

  modificatedDate(boton: String) {
    this.eventos = [];
    if (boton == "a") {

      let month = this.mes == "1" ? 0 : parseInt(this.mes) - 1;
      let year = parseInt(this.anio);

      if (month >= 1 && month <= 12) {
        this.count = 0;
        this.getSem1 = [];
        this.mes = month.toString();
        this.fecha = this.meses[month - 1] + " " + this.anio;
        this.dividirSemanas(this.getDatesFromDays(month, year));
      } else if (month < 1) {
        this.count = 0;
        this.getSem1 = [];
        month = 12;
        this.mes = month.toString();
        this.anio = (year - 1).toString();
        this.fecha = this.meses[month - 1] + " " + this.anio;
        this.dividirSemanas(this.getDatesFromDays(month, (year - 1)));
      }

    } else if (boton == "d") {

      let month = this.mes == "12" ? 0 : parseInt(this.mes) + 1;
      let year = parseInt(this.anio);

      if (month >= 1 && month <= 12) {
        this.count = 0;
        this.getSem1 = [];
        this.mes = month.toString();
        this.fecha = this.meses[month - 1] + " " + this.anio;
        this.dividirSemanas(this.getDatesFromDays(month, year));
      } else if (month < 1) {
        this.count = 0;
        this.getSem1 = [];
        month = 1;
        this.mes = month.toString();
        this.anio = (year + 1).toString();
        this.fecha = this.meses[month - 1] + " " + this.anio;
        this.dividirSemanas(this.getDatesFromDays(month, (year + 1)));
      }
    }
  }

  getDate($event) {

    let idEvento = $event.target.id;
    if (idEvento != " ") {

      let fecha = `${this.anio}-${this.mes}-${idEvento.toString().trim()}`;

      this.eventos = [];
      this.contactosSel.clear();
      this.calendarioService.listaByFechaID(fecha.toString(), this.idUser).subscribe(model => {

        if (model?.length > 0) {

          this.eventos = model;
        } else {

          let fecha = new Date(`${this.anio}/${this.mes}/${idEvento.toString().trim()}`);
          this.calendarioBase = new CalendarioBase(0, "Nuevo Evento", fecha, null, null, []);
          this.contactoService.listaContactoToCalendario(this.idContacto).subscribe(model => {
            this.contactos = model;
          }, err => {
            this.contactos = [];
          });
          this.largeModal.show();
        }

      }, err => {
        this.eventos = [];
      });


    } else {
      alert("No se puede agendar aqui");
    }
  }

  getDatesFromDays(month, year): Object[] {

    this.startDay = moment(`${year}-${month}-01`);
    const endDate = this.startDay.clone().endOf('month');

    const daysMonth = endDate.diff(this.startDay, 'days', true);

    this.numDias = Math.round(daysMonth);

    this.arrayd = Object.keys([...Array(this.numDias)]).map((a: any) => {

      a = parseInt(a) + 1;

      const dayObject = moment(`${year}-${month}-${a}`);

      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday()
      }
    });
    return this.arrayd;
  }

  llenarDias(dia: string, valor, numDias, diaInicial: String, diaIBool) {
    let pos = 0;
    let res = false;

    for (let index = 0; index < this.ar.length; index++) {

      if (diaIBool == false) {
        res = true;
      }
      if (diaInicial === this.ar[index] && diaIBool == true) {

        this.ar[index] = valor;
        pos = index;
        pos++;
        res = true;
        valor += 1;
        this.count += 1;
      } else if (res == true && this.count < this.numDias) {

        this.ar[pos] = valor++;
        pos++;
        this.count += 1;
      }
      else if (this.count > this.numDias) {
        this.ar[pos] = " ";
        pos++;
      }
    }
  }
  dividirSemanas(arrayDias: Array<any>) {

    let res = false;
    for (let index = 0; index < 6; index++) {

      if (index == 0)
        res = true;
      else
        res = false;

      this.llenarDias(arrayDias[this.count]?.name, arrayDias[this.count]?.value, this.numDias, arrayDias[0]?.name, res);

      this.getSem1.push(new Calendario(
        this.ar[0] == "Sunday" ? " " : this.ar[0],
        this.ar[1] == "Monday" ? " " : this.ar[1],
        this.ar[2] == "Tuesday" ? " " : this.ar[2],
        this.ar[3] == "Wednesday" ? " " : this.ar[3],
        this.ar[4] == "Thursday" ? " " : this.ar[4],
        this.ar[5] == "Friday" ? " " : this.ar[5],
        this.ar[6] == "Saturday" ? " " : this.ar[6]));
      this.limpiarGrid();
    }
    this.cargarAgenda();
  }

  cargarAgenda() {


    const dateInicial = `${this.anio}-${this.mes}-01`;
    const dateFinal = `${this.anio}-${this.mes}-${this.numDias}`;

    this.calendarioService.listaByFecha(dateInicial, dateFinal, this.idUser).subscribe(model => {

      this.calendario = model;

      if (this.calendario.length > 0) {

        for (let index = 0; index < this.calendario.length; index++) {

          let mesFecha = this.calendario[index].fecha.toString().split('-', 3);

          for (let index = 0; index < this.getSem1.length; index++) {

            if (this.getSem1[index].Sunday == mesFecha[2]) {
              this.getSem1[index].Sunday = "  " + mesFecha[2];
              break;

            } else if (this.getSem1[index].Monday == mesFecha[2]) {
              this.getSem1[index].Monday = "  " + mesFecha[2];
              break;

            } else if (this.getSem1[index].Tuesday == mesFecha[2]) {
              this.getSem1[index].Tuesday = "  " + mesFecha[2];
              break;

            } else if (this.getSem1[index].Wednesday == mesFecha[2]) {
              this.getSem1[index].Wednesday = "  " + mesFecha[2];
              break;

            } else if (this.getSem1[index].Thursday == mesFecha[2]) {
              this.getSem1[index].Thursday = "  " + mesFecha[2];
              break;

            } else if (this.getSem1[index].Friday == mesFecha[2]) {

              this.getSem1[index].Friday = "  " + mesFecha[2];
              break;

            } else if (this.getSem1[index].Saturday == mesFecha[2]) {

              this.getSem1[index].Saturday = "  " + mesFecha[2];
              break;
            }

          }

        }
      }

    })

  }

  limpiarGrid() {
    this.ar = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }
  seleccionarContacto(evento) {

    let id = evento.target.value;

    let nombre = evento.target.options[evento.target.options.selectedIndex].text;

    if (id != null && id > 0) {

      this.contactosSel.set(parseInt(id), nombre);
      if (!this.ids.find(x => x == id))
        this.ids.push(id);


    }
    evento.target.selectedIndex = 0;
  }

  editarElementos(evento) {
    let id = evento;

    if (this.contactosSel.has(id)) {

      this.contactosSel.delete(id);

      if (this.ids.find(x => x == id)) {
        this.ids.splice(this.ids.findIndex(x => x == id), 1);
      }
    }
  }
  onCreate() {
    this.calendarioBase.contactos = [];

    if (this.calendarioBase.resumen != " " && this.calendarioBase.horaFinal != null && this.calendarioBase.horaInicio != null) {

      if (this.calendarioBase.horaInicio < this.calendarioBase.horaFinal) {

        if(!this.ids.find(x => x ==  this.idContacto))
          this.ids.push(this.idContacto);
        
          this.contactosSel.set(this.idContacto, "Yo");

        if (this.ids.length > 0) {

          for (let index = 0; index < this.ids.length; index++) {

            let contacto = new Contacto(this.contactosSel.get(parseInt(this.ids[index].toString())), false, "",
              null, "", "", "", null, null, "", "", "", "", "", "", null, "", false, null, "","",null);

            contacto.id = this.ids[index];

            this.calendarioBase.contactos.push(contacto);         
          }

        }
        if (this.calendarioBase.id > 0) {
          this.calendarioService.update(this.calendarioBase).subscribe(model => {
            alert("Se actualizo la fecha correctamente");
            this.largeModal.hide();
            this.count = 0;
            this.getSem1 = [];
            this.eventos = [];
            this.ids=[];
            this.contactosSel.clear();
            this.dividirSemanas(this.getDatesFromDays(this.mes, this.anio));
          }, err => {
            alert(err.error.mensaje);
          });
        } else {
          this.calendarioService.save(this.calendarioBase).subscribe(model => {
            alert("Se inserto la fecha correctamente");
            this.largeModal.hide();
            this.count = 0;
            this.getSem1 = [];
            this.eventos = [];
            this.ids=[];
            this.contactosSel.clear()
            this.dividirSemanas(this.getDatesFromDays(this.mes, this.anio));
          }, err => {
            alert(err.error.mensaje);
          });
        }
      } else {
        alert('El tiempo inicial no puede ser menor al final');
      }
    } else {
      alert('llena los campos no seas estupido');
    }


  }

  deleteCalendario(idCal: number) {

    if (idCal > 0) {

      this.calendarioService.delete(idCal).subscribe(model => {

        this.count = 0;
        this.getSem1 = [];
        if (this.eventos.find(x => x.id == idCal))
          this.eventos.splice(this.ids.findIndex(x => x == idCal), 1);

        this.dividirSemanas(this.getDatesFromDays(this.mes, this.anio));
        alert(model.mensaje);
      }, err => {

        alert(err.error.mensaje);
      })
    }
  }

  getCalearioById(id) {

    this.ids = [];
    this.contactosSel.clear();
    this.calendarioService.getCalendarioById(id).subscribe(model => {
      this.calendarioBase = model;
      this.calendarioBase.fecha = new Date(model.fecha.toString().replace('-', '/'));


      this.calendarioBase.contactos.forEach(element => {
        if (element.id !== this.idContacto)
          this.contactosSel.set(element.id, element.nombreContacto);

        if (!this.ids.find(x => x == element.id))
          this.ids.push(element.id);
      });

      this.contactoService.listaContactoToCalendario(this.idContacto).subscribe(model => {
        this.contactos = model;
      }, err => {
        this.contactos = [];
      });
      this.largeModal.show();
    }, err => {
      alert("error")
    });
  }

  getCalendarioNewFecha(fecha: string) {

    let fechaOriginal = new Date(fecha.replace('-', '/'));
    this.ids = [];
    this.contactosSel.clear();
    this.calendarioBase = new CalendarioBase(0, "Nuevo Evento", fechaOriginal, null, null, []);
    this.contactoService.listaContactoToCalendario(this.idContacto).subscribe(model => {
      this.contactos = model;
    }, err => {
      this.contactos = [];
    });
    this.largeModal.show();
  }

}
