// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  api_oauth_desenv: 'http://localhost:8080/',
  api_oauth_homolog: '',
  api_oauth_producao: '',

  web_oauth_desenv: 'http://localhost:4200/',
  web_oauth_homolog: '',
  web_oauth_producao: '',

  client_id: 'OAUTH_CLI',
  client_secret: 'a',
  fl_seguranca: true,
  chave_token_acesso: 'tokenAcesso',
  nomes_apis: ['OAUTH_API'],
  trechos_invalidos: ['/oauth/token'],
  urls_aptas: ['http://localhost:8080/']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
