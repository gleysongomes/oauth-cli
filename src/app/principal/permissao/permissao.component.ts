import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '../../seguranca/auth.service';
import { PermissaoService } from './../../service/permissao.service';
import { AplicacaoService } from '../../service/aplicacao.service';
import { ModalPesquisarAplicacaoComponent } from '../../modal/modal-pesquisar-aplicacao/modal-pesquisar-aplicacao.component';
import { INITIAL_PAGE } from './../../util/constants';
import { Page } from '../../model/page';
import { Permissao } from './../../model/permissao';
import { Aplicacao } from '../../model/aplicacao';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.scss']
})
export class PermissaoComponent implements OnInit {

  permissao: Permissao = new Permissao();

  page: Page = new Page();

  permissoes: Permissao[] = [];

  constructor(private permissaoService: PermissaoService,
    private aplicacaoService: AplicacaoService,
    private notificationsService: NotificationsService,
    public authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listar(INITIAL_PAGE);
  }

  buscar(cdPermissao: number) {
    if (cdPermissao) {
      this.permissaoService
        .buscar(cdPermissao)
        .subscribe(res => {
          this.permissao = res;
        }, () => {
        });
    }
  }

  listar(page: number) {
    this.page.number = page;
    this.permissaoService
      .listar(this.permissao, this.page)
      .subscribe(res => {
        this.page.totalElements = res.totalElements;
        this.permissoes = res.content;
      });
  }

  adicionar() {
    this.permissaoService
      .adicionar(this.permissao)
      .subscribe(res => {
        this.permissao = new Permissao();
        this.listar(this.page.number);
        this.notificationsService.success('Permissao salva com sucesso.');
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao salvar permissao.');
        }
      });
  }

  atualizar() {
    this.permissaoService
      .atualizar(this.permissao)
      .subscribe(res => {
        this.permissao = new Permissao();
        this.listar(this.page.number);
        this.notificationsService.success('Permissao atualizada com sucesso.');
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao atualizar permissao.');
        }
      });
  }

  onSubmit(f: NgForm) {
    if (this.permissao.cdPermissao) {
      this.atualizar();
    } else {
      this.adicionar();
    }
  }

  limpar() {
    this.permissao = new Permissao();
  }

  buscarAplicacao() {
    if (this.permissao.cdAplicacao) {
      this.aplicacaoService
        .buscar(this.permissao.cdAplicacao)
        .subscribe(res => {
          this.permissao.aplicacao = res;
        }, (err) => {
          if (err.userMessage) {
            this.notificationsService.error(err.userMessage);
          } else {
            this.notificationsService.error('Erro ao buscar aplicação.');
          }
        });
    }
  }

  pesquisarAplicacao() {
    this.showModalPesquisarAplicacao();
  }

  private showModalPesquisarAplicacao() {
    const dialogRef = this.dialog.open(ModalPesquisarAplicacaoComponent, {
      width: '850px',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      data: {
        title: 'Aplicações'
      }
    });

    dialogRef.afterClosed()
      .subscribe((result: Aplicacao) => {
        if (result) {
          this.permissao.cdAplicacao = result.cdAplicacao;
          this.permissao.aplicacao.nome = result.nome;
        }
      });
  }

}
