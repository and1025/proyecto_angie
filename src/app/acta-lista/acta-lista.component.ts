import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-acta-lista',
  templateUrl: './acta-lista.component.html',
  styleUrls: ['./acta-lista.component.css']
})
export class ActaListaComponent implements OnInit {

  constructor(private router:Router, private httpClient:HttpClient) { }
  actas:any;
  ngOnInit(): void {

    if(localStorage.getItem('data_user')) {
      let object_user: any;
      // @ts-ignore
      object_user = JSON.parse(localStorage.getItem('data_user')) || '';
      this.getActas(object_user.user.id)
      .subscribe(
        (data:any) => {
          this.actas = data['msg'];
          for(let i = 0; i < this.actas.length; i++){
            this.actas[i].acta = JSON.parse(this.actas[i].acta);
          }
          setTimeout(() => {
            console.log(this.actas);
          }, 1000);
        },
        (error:any) => {
          console.log('Error:', error);
        }
      );
    }
  }

  verActa(acta:any){
    localStorage.setItem('acta', JSON.stringify(acta));
    setTimeout(() => {
      this.router.navigate(['/acta']);
    }, 1000);
  }

  verAdjuntos(adjuntos:any){
    console.log(adjuntos);
    for (let i = 0; i < adjuntos.length; i++ ) {
      console.log(adjuntos[i]);
      if(adjuntos[i] != ''){
        window.open(adjuntos[i], '_blank');
      }
    }
  }

  getActas(user: any): Observable<any> {
    let url = 'http://localhost:3000/api/getActa'+'?user='+user;
    return this.httpClient.get(url);
  }

  crearActa(){
    localStorage.removeItem('acta');
    this.router.navigate(['/acta']);
  }

}
