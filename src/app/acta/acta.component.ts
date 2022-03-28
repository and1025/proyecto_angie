import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.css']
})
export class ActaComponent implements OnInit {

  constructor(private router:Router,private httpClient:HttpClient, private fileUploadService:FileUploadService ) { }
  tableConc = [];
  tableAus = [];
  tablePart = [];
  convo = {};
  validateButton  = false;
  ngOnInit(): void {
    if( localStorage.getItem('acta')){
      this.validateButton = true;
      // @ts-ignore     )
      this.objetoActa = JSON.parse(localStorage.getItem('acta')).acta;
      this.tableConc = this.objetoActa.tablaConclusiones;
      this.tableAus = this.objetoActa.tablaAusentes;
      this.tablePart = this.objetoActa.tablaParticipantes;
      this.convo = this.objetoActa.convocatoria;
    }
  }
  convocatoria = {
    fecha: '',
    hora: '',
    lugar: '',
    transcriptor: '',
  }
  tablaParticipantes = [];
  tablaAusentes = [];
  tablaConclusiones = [];
  filesToUpload = [];
  objetoActa = {
    filesToUpload: [''],
    'version': '',
    'codigo': '',
    'grupo': '',
    'numeroActa': '',
    'citadopor': '',
    'fecha': '',
    'coordinador': '',
    'inicio': '',
    'fin': '',
    'lugar': '',
    'secretario': '',
    'objetivo': '',
    'reunion': '',
    'presencial': '',
    'virtual': '',
    'linkGrabacion': '',
    'ordenDia': '',
    'agenda': '',
    'verificacionCumplimientos': [],
    'desarrolloReunion': '',
    'firmaResponsable': '',
    tablaConclusiones: [],
    tablaParticipantes: [],
    tablaAusentes: [],
    convocatoria: {},
    id_user: ''
  }

  crearActa(){
    this.getTableConclusiones();
    // @ts-ignore
    this.tablaConclusiones = this.getTableConclusiones();
    // @ts-ignore
    this.tablaAusentes = this.getTableAusentes();
    // @ts-ignore
    this.tablaParticipantes = this.getTableParticipantes();
    this.objetoActa.convocatoria = this.convocatoria;
    console.log(this.objetoActa);
    setTimeout(() => {
      this.registerActa(this.objetoActa).subscribe(
      data => {
        this.router.navigate(['/acta-lista']);
      },
      error => {
        console.log('Error:', error);
      });
    }, 1500);
  }

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: null = null; // Variable to store file

  // On file Select
  onChange(event:any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;
          //console.log(this.shortLink);
          // @ts-ignore
          this.objetoActa.filesToUpload.push(this.shortLink);
          this.loading = false; // Flag variable
        }
      }
    );
  }

  registerActa(objetoActa:object): Observable<any> {
    let url = 'http://localhost:3000/api/registerActa';
    // @ts-ignore
    let data_user = JSON.parse(localStorage.getItem('data_user'));
    this.objetoActa.id_user = data_user['user'].id;
    this.objetoActa.tablaConclusiones = this.tablaConclusiones;
    this.objetoActa.tablaAusentes = this.tablaAusentes;
    this.objetoActa.tablaParticipantes = this.tablaParticipantes;
    this.objetoActa.convocatoria = this.convocatoria;
    console.log('objetoCon', this.objetoActa);
    return this.httpClient.post(url, objetoActa);
  }

  getTableParticipantes(){
    var participantes: HTMLTableCellElement[] = [];
    var rows = document.getElementsByTagName('table')[0].rows;
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < rows[i].cells.length; j++)
      {
        // @ts-ignore
        participantes.push(rows[i].cells[j].innerHTML);
      }
    }
    return participantes;
  }

  getTableAusentes(){
    var ausentes: HTMLTableCellElement[] = [];
    var rows = document.getElementsByTagName('table')[1].rows;
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < rows[i].cells.length; j++)
      {
        // @ts-ignore
        ausentes.push(rows[i].cells[j].innerHTML);
      }
    }
    return ausentes;
  }

  getTableConclusiones(){
    var conclusions: HTMLTableCellElement[] = [];
    var rows = document.getElementsByTagName('table')[2].rows;
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < rows[i].cells.length; j++)
      {
        // @ts-ignore
        conclusions.push(rows[i].cells[j].innerHTML);
      }
    }
    return conclusions;
  }

  imprimirActa(){
    window.print();
  }

}
