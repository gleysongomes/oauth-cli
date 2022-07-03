import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';

import { ApiService } from '../../service/api.service';
import { Page } from '../../model/page';
import { GrupoFilter } from '../../model/filter/grupo.filter';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  grupo: GrupoFilter = new GrupoFilter();

  page: Page = new Page();

  tiposArquivo: string[] = ['pdf', 'csv', 'xls', 'xlsx'];

  tiposRelatorio = [
    { ds: 'Analítico', v: 'analitico' },
    { ds: 'Sintético', v: 'sintetico' }];

  constructor(private api: ApiService,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.grupo.tipoArquivo = 'pdf';
    this.grupo.tipoRelatorio = 'analitico';
  }

  gerarRelatorio() {
    const grupoAtualizado = { ...this.grupo };
    if (this.grupo.dtCadastroInicial && this.grupo.dtCadastroFinal) {
      grupoAtualizado.dtCadastroInicial = moment(this.grupo.dtCadastroInicial).format('DD/MM/YYYY');
      grupoAtualizado.dtCadastroFinal = moment(this.grupo.dtCadastroFinal).format('DD/MM/YYYY');
    }
    this.api.getReportAuth('reports/grupos', grupoAtualizado)
      .subscribe(res => {
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao gerar relatório de grupos.');
        }
      });
  }

  limpar() {
    this.grupo = new GrupoFilter();
    this.grupo.tipoArquivo = 'pdf';
    this.grupo.tipoRelatorio = 'analitico';
  }

}
