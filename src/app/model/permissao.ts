import { Aplicacao } from './aplicacao';

export class Permissao {

  cdPermissao: number;

  nome: string;

  descricao: string;

  dtCadastro: Date;

  dtAtualizacao: Date;

  cdAplicacao: number;

  cdUsuarioCriacao: number;

  cdUsuarioAtualizacao: number;

  flAtiva: boolean;

  aplicacao: Aplicacao;

  constructor() {
    this.aplicacao = new Aplicacao();
  }

}
