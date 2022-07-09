import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '../../seguranca/auth.service';
import { INITIAL_PAGE } from '../../util/constants';
import { Aplicacao } from '../../model/aplicacao';
import { AplicacaoService } from '../../service/aplicacao.service';
import { Page } from '../../model/page';

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-modal-pesquisar-aplicacao',
  templateUrl: './modal-pesquisar-aplicacao.component.html',
  styleUrls: ['./modal-pesquisar-aplicacao.component.scss']
})
export class ModalPesquisarAplicacaoComponent implements OnInit {

  title: string;

  aplicacao: Aplicacao = new Aplicacao();

  page: Page = new Page();

  aplicacoes: Aplicacao[] = [];

  readonly INITIAL_PAGE = INITIAL_PAGE;

  constructor(private aplicacaoService: AplicacaoService,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    public authService: AuthService,
    private dialogRef: MatDialogRef<ModalPesquisarAplicacaoComponent>) { }

  ngOnInit(): void {
    this.title = this.data['title'];
    this.listar(INITIAL_PAGE);
  }

  listar(page: number) {
    this.page.number = page;
    this.aplicacaoService
      .listar(this.aplicacao, this.page)
      .subscribe(res => {
        this.page.totalElements = res.totalElements;
        this.aplicacoes = res.content;
      });
  }

  selecionar(aplicacao: Aplicacao) {
    this.dialogRef.close(aplicacao);
  }

}
