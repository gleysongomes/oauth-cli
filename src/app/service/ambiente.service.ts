import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  private urlApiOauth: string;

  constructor() {
    const homologacao = '';
    const desenvolvimento = '';
    const producao = '';
    const localhost = '';
    this.urlApiOauth = `${environment.api_oauth_desenv}`;
  }

  returnURlAmbiente(): string {
    return this.urlApiOauth;
  }

}
