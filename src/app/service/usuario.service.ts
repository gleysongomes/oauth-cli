import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Usuario } from '../model/usuario';
import { Page } from '../model/page';

@Injectable({ providedIn: "root" })
export class UsuarioService {

  constructor(private api: ApiService) { }

  listar(usuario: Usuario, page: Page): Observable<any> {
    const params = this.api.getHttpParamsPage(usuario, page);
    return this.api.get('usuarios', params);
  }

  adicionar(usuario: Usuario): Observable<Usuario> {
    return this.api.post('usuarios', usuario);
  }

  buscar(cdUsuario: number): Observable<Usuario> {
    return this.api.get(`usuarios/${cdUsuario}`);
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.api.put(`usuarios/${usuario.cdUsuario}`, usuario);
  }

}
