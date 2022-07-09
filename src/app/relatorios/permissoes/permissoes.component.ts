import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';

import { ApiService } from '../../service/api.service';
import { Page } from '../../model/page';
import { PermissaoFilter } from '../../model/filter/permissao.filter';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.scss']
})
export class PermissoesComponent implements OnInit {

  permissao: PermissaoFilter = new PermissaoFilter();

  page: Page = new Page();

  tiposArquivo: string[] = ['pdf', 'csv', 'xls', 'xlsx'];

  tiposRelatorio = [
    { ds: 'Analítico', v: 'analitico' },
    { ds: 'Sintético', v: 'sintetico' }];

  constructor(private api: ApiService,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.permissao.tipoArquivo = 'pdf';
    this.permissao.tipoRelatorio = 'analitico';
  }

  gerarRelatorio() {
    const grupoAtualizado = { ...this.permissao };
    if (this.permissao.dtCadastroInicial && this.permissao.dtCadastroFinal) {
      grupoAtualizado.dtCadastroInicial = moment(this.permissao.dtCadastroInicial).format('DD/MM/YYYY');
      grupoAtualizado.dtCadastroFinal = moment(this.permissao.dtCadastroFinal).format('DD/MM/YYYY');
    }
    this.api.getReportAuth('reports/permissoes', grupoAtualizado)
      .subscribe(res => {
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao gerar relatório de permissões.');
        }
      });
  }

  limpar() {
    this.permissao = new PermissaoFilter();
    this.permissao.tipoArquivo = 'pdf';
    this.permissao.tipoRelatorio = 'analitico';
  }

}
