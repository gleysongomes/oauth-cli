import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { AmbienteService } from '../service/ambiente.service';
import { environment } from '../../environments/environment';
import { Login } from '../model/login';

@Injectable()
export class AuthService {

  private oauthTokenUrl: string;

  private jwtPayload: any;

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,
    private ambiente: AmbienteService,
    private router: Router) {
    this.oauthTokenUrl = this.ambiente.returnURlAmbiente() + 'oauth/token';
  }

  private setHeadersAuth(autorizacao: string): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + autorizacao);
    return headers;
  }

  igualCdUsuarioLogado(cdUsuario: number) {
    return this.jwtPayload && this.jwtPayload.cd_usuario === cdUsuario;
  }

  configuracaoAutorizacao(): HttpHeaders {
    const autorizacao = btoa(environment.client_id + ':' + environment.client_secret);
    return this.setHeadersAuth(autorizacao);
  }

  login(login: Login): Observable<any> {
    const headers = this.configuracaoAutorizacao();
    const body = `username=${login.usuario}&password=${login.senha}&grant_type=password&nomeApp=${environment.client_id}&nomesApis=${environment.nomes_apis.join(',')}`;

    return this.http.post<any>(this.oauthTokenUrl, body, {
      headers,
      withCredentials: true
    })
      .pipe(map(res => this.armazenarToken(
        environment.chave_token_acesso,
        res && res.access_token)
      ))
      .pipe(catchError(res => {
        return throwError(() => new Error(res));
      }));
  }

  private armazenarToken(id: string, token: string) {
    if (token) {
      localStorage.setItem(id, token);
    }
    return this.carregarPayloadToken(id);
  }

  carregarPayloadToken(id: string) {
    try {
      const token = localStorage.getItem(id);
      if (token) {
        return this.jwtHelper.decodeToken(token);
      }
    } catch (e) {
    }
    return null;
  }

  tokenAcessoInvalido(id: string) {
    try {
      const token = localStorage.getItem(id);
      return !token || this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      this.limparTokenAcesso(id);
      return true;
    }
  }

  novoTokenAcesso(): Observable<any> {
    const headers = this.configuracaoAutorizacao();
    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl,
      body,
      {
        headers,
        withCredentials: true
      }).pipe(map(res => this.armazenarToken(
        environment.chave_token_acesso,
        res && res.access_token)
      ))
      .pipe(catchError(res => {
        return throwError(() => new Error(res));
      }));
  }

  temPermissao(permissao: string) {
    const jwtPayload = this.carregarPayloadToken(environment.chave_token_acesso);
    return jwtPayload
      && jwtPayload.authorities
      && jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(permissoes: string[]) {
    for (const p of permissoes) {
      if (this.temPermissao(p)) {
        return true;
      }
    }
    return false;
  }

  limparTokenAcesso(id: string) {
    localStorage.removeItem(id);
  }

  validarToken<T>(req: Observable<T>): Observable<T> {
    if (this.tokenAcessoInvalido(environment.chave_token_acesso)) {
      return this.novoTokenAcesso()
        .pipe(concatMap(() => {
          if (this.tokenAcessoInvalido(environment.chave_token_acesso)) {
            return throwError(() => new Error('Token inválido!'));
          }
          return req;
        }))
        .pipe(catchError(res => {
          this.limparTokenAcesso(environment.chave_token_acesso);
          this.router.navigate(['/login']);
          return throwError(() => new Error(res));
        }));
    } else {
      return req;
    }
  }

}
