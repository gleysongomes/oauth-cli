export class Aplicacao {

  cdAplicacao: number;

  nome: string;

  descricao: string;

  dtCadastro: Date;

  dtAtualizacao: Date;

  cdUsuarioCriacao: number;

  cdUsuarioAtualizacao: number;

  flAtiva: boolean;

  tipo: string;

  segredo: string;

  flSeguranca: boolean;

  tmpAccessToken: number;

  tmpRefreshToken: number;

  flRefreshToken: boolean;

  constructor() {
  }

}
