import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '../auth.service';
import { Login } from '../../model/login';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean;

  login: Login = new Login();

  constructor(private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.loading = false;
    this.authService.limparTokenAcesso(environment.chave_token_acesso);
  }

  onSubmit(f: NgForm) {
    this.loading = true;
    this.authService.login(this.login)
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['']);
      }, () => {
        this.loading = false;
        this.notificationsService.error('Erro ao tentar acessar o sistema.');
      });
  }

}
