import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Imovel } from '../model/Imovel';
import { ImoveisService } from '../services/imoveis.service';



@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css']
})
export class ImoveisComponent implements OnInit {

  imovel : Imovel = new Imovel()
  listaImoveis : Imovel[]

  form: FormGroup;



  constructor(
    private router: Router,
    private imoveisService: ImoveisService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    //window.scroll(0,0)

    this.listarImoveis();
  }

  listarImoveis(){
    this.imoveisService.listarImoveis().subscribe((resp: Imovel[]) => {
      this.listaImoveis = resp
    })

  }

  publicar(){
    this.imoveisService.postarImovel(this.imovel).subscribe((resp: Imovel) => {
      this.imovel = resp
      alert('Anuncio realizado com sucesso!')
      this.imovel = new Imovel()
      this.listarImoveis()
    })
  }

  consultaCEP(dados:any, form:any) {

    this.imoveisService.buscar(dados).subscribe((dados) => this.completeForm(dados, form));

  }

  completeForm(dados:any, form:any){
    form.setValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    })
  }
}
