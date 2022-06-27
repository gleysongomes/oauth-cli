import { Component, OnInit } from '@angular/core';

import { AuthService } from '../seguranca/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  tokenAcessoInvalido() {
    return this.auth.tokenAcessoInvalido(environment.chave_token_acesso);
  }

}
