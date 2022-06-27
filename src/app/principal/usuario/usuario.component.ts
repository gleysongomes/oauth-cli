import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';

import { UsuarioService } from '../../service/usuario.service';
import { AuthService } from '../../seguranca/auth.service';
import { Usuario } from '../../model/usuario';
import { Page } from '../../model/page';
import { INITIAL_PAGE } from '../../util/constants';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();

  page: Page = new Page();

  cdUsuario: number;

  usuarios: Usuario[] = [];

  atualizacaoUsuario = false;

  constructor(private usuarioService: UsuarioService,
    private notificationsService: NotificationsService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.listar(INITIAL_PAGE);
  }

  buscar(cdUsuario: number) {
    if (cdUsuario) {
      this.usuarioService
        .buscar(cdUsuario)
        .subscribe(res => {
          this.atualizacaoUsuario = true;
          this.usuario = res;
        }, () => {
        });
    }
  }

  listar(page: number) {
    this.page.number = page;

    this.usuarioService
      .listar(this.usuario, this.page)
      .subscribe(res => {
        this.page.totalElements = res.totalElements;
        this.usuarios = res.content;
      });
  }

  adicionar() {
    this.usuarioService
      .adicionar(this.usuario)
      .subscribe(res => {
        this.usuario = new Usuario();
        this.listar(this.page.number);
        this.notificationsService.success('Usuário salvo com sucesso.');
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao salvar usuário.');
        }
      });
  }

  atualizar() {
    this.usuarioService
      .atualizar(this.usuario)
      .subscribe(res => {
        this.atualizacaoUsuario = false;
        this.usuario = new Usuario();
        this.listar(this.page.number);
        this.notificationsService.success('Usuário atualizado com sucesso.');
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao atualizar usuário.');
        }
      });
  }

  onSubmit(f: NgForm) {
    if (this.usuario.cdUsuario) {
      this.atualizar();
    } else {
      this.atualizacaoUsuario = false;
      this.adicionar();
    }
  }

  limpar() {
    this.usuario = new Usuario();
  }

}
