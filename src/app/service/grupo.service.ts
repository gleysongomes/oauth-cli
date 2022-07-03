import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Grupo } from '../model/grupo';
import { Page } from '../model/page';

@Injectable({ providedIn: "root" })
export class GrupoService {

  constructor(private api: ApiService) { }

  buscar(cdGrupo: number): Observable<Grupo> {
    return this.api.get(`grupos/${cdGrupo}`);
  }

  adicionar(grupo: Grupo): Observable<Grupo> {
    return this.api.post('grupos', grupo);
  }

  atualizar(grupo: Grupo): Observable<Grupo> {
    return this.api.put(`grupos/${grupo.cdGrupo}`, grupo);
  }

  listar(grupo: Grupo, page: Page): Observable<any> {
    const params = this.api.getHttpParamsPage(grupo, page);
    return this.api.get('grupos', params);
  }

}
