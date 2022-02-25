import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Imovel } from '../model/Imovel';

@Injectable({
  providedIn: 'root'
})
export class ImoveisService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

    buscar(cep:String) {
      return this.http.get(`//viacep.com.br/ws/${cep}/json/`);
    }

  listarImoveis(): Observable<Imovel[]>{
    return this.http.get<Imovel[]>("http://localhost:5875/imovel");
  }

  postarImovel(imovel: Imovel): Observable<Imovel>{
    return this.http.post<Imovel>('http://localhost:5875/imovel', imovel);
  }
}
