import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Permissao } from '../model/permissao';
import { Page } from '../model/page';

@Injectable({ providedIn: "root" })
export class PermissaoService {

  constructor(private api: ApiService) { }

  buscar(cdPermissao: number): Observable<Permissao> {
    return this.api.get(`permissoes/${cdPermissao}`);
  }

  adicionar(permissao: Permissao): Observable<Permissao> {
    return this.api.post('permissoes', permissao);
  }

  atualizar(permissao: Permissao): Observable<Permissao> {
    return this.api.put(`permissoes/${permissao.cdPermissao}`, permissao);
  }

  listar(permissao: Permissao, page: Page): Observable<any> {
    const params = this.api.getHttpParamsPage(permissao, page);
    return this.api.get('permissoes', params);
  }

}
