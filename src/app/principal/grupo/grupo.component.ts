import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '../../seguranca/auth.service';
import { Grupo } from '../../model/grupo';
import { GrupoService } from '../../service/grupo.service';
import { INITIAL_PAGE } from '../../util/constants';
import { Page } from '../../model/page';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  grupo: Grupo = new Grupo();

  page: Page = new Page();

  grupos: Grupo[] = [];

  constructor(private grupoService: GrupoService,
    private notificationsService: NotificationsService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.listar(INITIAL_PAGE);
  }

  buscar(cdGrupo: number) {
    if (cdGrupo) {
      this.grupoService
        .buscar(cdGrupo)
        .subscribe(res => {
          this.grupo = res;
        }, () => {
        });
    }
  }

  listar(page: number) {
    this.page.number = page;

    this.grupoService
      .listar(this.grupo, this.page)
      .subscribe(res => {
        this.page.totalElements = res.totalElements;
        this.grupos = res.content;
      });
  }

  adicionar() {
    this.grupoService
      .adicionar(this.grupo)
      .subscribe(res => {
        this.grupo = new Grupo();
        this.listar(this.page.number);
        this.notificationsService.success('Grupo salvo com sucesso.');
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao salvar grupo.');
        }
      });
  }

  atualizar() {
    this.grupoService
      .atualizar(this.grupo)
      .subscribe(res => {
        this.grupo = new Grupo();
        this.listar(this.page.number);
        this.notificationsService.success('Grupo atualizado com sucesso.');
      }, (err) => {
        if (err.userMessage) {
          this.notificationsService.error(err.userMessage);
        } else {
          this.notificationsService.error('Erro ao atualizar grupo.');
        }
      });
  }

  onSubmit(f: NgForm) {
    if (this.grupo.cdGrupo) {
      this.atualizar();
    } else {
      this.adicionar();
    }
  }

  limpar() {
    this.grupo = new Grupo();
  }

}
