import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import * as moment from 'moment';

import { ApiService } from '../../service/api.service';
import { Page } from '../../model/page';
import { UsuarioFilter } from '../../model/filter/usuario.filter';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuario: UsuarioFilter = new UsuarioFilter();

  page: Page = new Page();

  tiposArquivo: string[] = ['pdf', 'csv', 'xls', 'xlsx'];

  tiposRelatorio = [
    { ds: 'Analítico', v: 'analitico' },
    { ds: 'Sintético', v: 'sintetico' }];

  constructor(private api: ApiService,
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.usuario.tipoArquivo = 'pdf';
    this.usuario.tipoRelatorio = 'analitico';
  }

  gerarRelatorio() {
    const usuarioAtualizado = { ...this.usuario };
    if (this.usuario.dtCadastroInicial && this.usuario.dtCadastroFinal) {
      usuarioAtualizado.dtCadastroInicial = moment(this.usuario.dtCadastroInicial).format('DD/MM/YYYY');
      usuarioAtualizado.dtCadastroFinal = moment(this.usuario.dtCadastroFinal).format('DD/MM/YYYY');
    }
    this.api.getReportAuth('reports/usuarios', usuarioAtualizado)
      .subscribe(res => {
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao gerar relatório de usuários.');
        }
      });
  }

  limpar() {
    this.usuario = new UsuarioFilter();
    this.usuario.tipoArquivo = 'pdf';
    this.usuario.tipoRelatorio = 'analitico';
  }

}
