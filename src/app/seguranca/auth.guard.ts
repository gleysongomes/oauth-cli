import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.tokenAcessoInvalido(environment.chave_token_acesso)) {
      return this.authService
        .novoTokenAcesso()
        .toPromise().then(() => {
          if (this.authService.tokenAcessoInvalido(environment.chave_token_acesso)) {
            this.authService.limparTokenAcesso(environment.chave_token_acesso);
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        }).catch(() => {
          this.authService.limparTokenAcesso(environment.chave_token_acesso);
          this.router.navigate(['/login']);
          return false;
        });
    }
    return true;
  }

}
