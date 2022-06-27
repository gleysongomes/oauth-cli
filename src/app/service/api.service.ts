import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../seguranca/auth.service';
import { AmbienteService } from './ambiente.service';
import { UtilsService } from './utils.service';
import { environment } from './../../environments/environment';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  flSeguranca: boolean;

  constructor(private http: HttpClient,
    private ambiente: AmbienteService,
    private auth: AuthService,
    private util: UtilsService) {
    this.flSeguranca = environment.fl_seguranca;
  }

  returnURlAmbiente(): string {
    return this.ambiente.returnURlAmbiente();
  }

  getReport(path: string, obj: any) {
    const url = `${this.returnURlAmbiente()}${path}`;
    const params = this.getParams(obj);
    window.open(url + '?' + params);
  }

  getReportAuth(path: string, obj: any): Observable<boolean> {
    if (obj && obj.tipoArquivo) {
      const params = this.getParams(obj);
      const url = this.ambiente.returnURlAmbiente() + `${path}`;
      return this.http.get(url + '?' + params, {
        observe: 'response',
        responseType: 'blob'
      }).pipe(map(res => {
        const ext = '.' + obj.tipoArquivo;
        const file = new Blob([res.body], { type: this.util.getMIME(ext) });
        this.gerar(path, obj, file);
        return true;
      })).pipe(catchError(res => {
        return throwError(() => new Error(res));
      }));
    } else {
      return throwError(() => new Error('Tipo de arquivo não informado.'));
    }
  }

  private gerar(path: string, obj: any, file: any) {
    const ext = '.' + obj.tipoArquivo;
    const fileURL = URL.createObjectURL(file);
    if (obj.tipoArquivo === 'pdf') {
      window.open(fileURL);
    } else {
      const a = document.createElement('a');
      a.setAttribute('href', fileURL);
      a.setAttribute('target', '_blank');
      a.setAttribute('download', path + '_' + new Date().getTime() + ext);
      a.click();
      a.remove();
    }
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    const req = this.http.get(
      this.ambiente.returnURlAmbiente() + `${path}`,
      { headers: this.setHeaders(), params }
    ).pipe(catchError(this.handleError));
    if (this.flSeguranca) {
      return this.auth.validarToken(req);
    } else {
      return req;
    }
  }

  put(path: string, body: Object = {}): Observable<any> {
    const req = this.http.put(
      this.ambiente.returnURlAmbiente() + `${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(catchError(this.handleError));
    if (this.flSeguranca) {
      return this.auth.validarToken(req);
    } else {
      return req;
    }
  }

  post(path: string, body: Object = {}): Observable<any> {
    const req = this.http.post(
      this.ambiente.returnURlAmbiente() + `${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(catchError(this.handleError));
    if (this.flSeguranca) {
      return this.auth.validarToken(req);
    } else {
      return req;
    }
  }

  delete(path: string): Observable<any> {
    const req = this.http.delete(
      this.ambiente.returnURlAmbiente() + `${path}`,
      { headers: this.setHeaders() }
    ).pipe(catchError(this.handleError));
    if (this.flSeguranca) {
      return this.auth.validarToken(req);
    } else {
      return req;
    }
  }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, */*'
    };
    return new HttpHeaders(headersConfig);
  }

  private getParams(obj: any): string {
    let queryParams = '';
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] != null && obj[key] !== 'null') {
          queryParams += key + '=' + obj[key] + '&';
        }
      }
    }
    return queryParams;
  }

  getHttpParams(to: any): HttpParams {
    let params = new HttpParams();
    for (const key in to) {
      if (to.hasOwnProperty(key)) {
        if (to[key] !== null && to[key] !== 'null'
          && to[key] !== undefined && to[key] !== 'undefined') {
          params = params.set(key, to[key]);
        }
      }
    }
    return params;
  }

  getHttpParamsPage(to: any, page: Page): HttpParams {
    const params = this.getHttpParams(to)
      .append('number', page.number.toString())
      .append('size', page.size.toString());
    return params;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.error || error);
  }

}
