import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.auth.limparTokenAcesso(environment.chave_token_acesso);
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }

}
