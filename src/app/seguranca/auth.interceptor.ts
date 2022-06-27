import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.urlValida(request)) {
      const token = localStorage.getItem(environment.chave_token_acesso);
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
          },
        });
      }
      return next.handle(request);
    }
    return next.handle(request);
  }

  private urlValida(request: HttpRequest<any>) {
    if (request && request.url && request.url.startsWith('http')) {
      if (this.prefixoValido(request.url)) {
        return true;
      }
    }
    return false;
  }

  private prefixoValido(url: string) {
    const resultado = environment.urls_aptas.find(u => url.startsWith(u));
    return resultado && !this.trechoInvalido(url);
  }

  private trechoInvalido(url: string) {
    const trechos = environment.trechos_invalidos;
    if (trechos.length > 0) {
      const resultado = trechos.findIndex(t => url.includes(t));
      return resultado != -1;
    }
    return false;
  }

}
