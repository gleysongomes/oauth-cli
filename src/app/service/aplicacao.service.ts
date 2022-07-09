import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Aplicacao } from '../model/aplicacao';
import { Page } from '../model/page';

@Injectable({ providedIn: "root" })
export class AplicacaoService {

  constructor(private api: ApiService) { }

  buscar(cdAplicacao: number): Observable<Aplicacao> {
    return this.api.get(`aplicacoes/${cdAplicacao}`);
  }

  adicionar(aplicacao: Aplicacao): Observable<Aplicacao> {
    return this.api.post('aplicacoes', aplicacao);
  }

  atualizar(aplicacao: Aplicacao): Observable<Aplicacao> {
    return this.api.put(`aplicacoes/${aplicacao.cdAplicacao}`, aplicacao);
  }

  listar(aplicacao: Aplicacao, page: Page): Observable<any> {
    const params = this.api.getHttpParamsPage(aplicacao, page);
    return this.api.get('aplicacoes', params);
  }

}
