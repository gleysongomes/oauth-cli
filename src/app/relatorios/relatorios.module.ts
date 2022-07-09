import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

import { RelatoriosComponent } from './relatorios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GruposComponent } from './grupos/grupos.component';
import { PermissoesComponent } from './permissoes/permissoes.component';

@NgModule({
  declarations: [
    RelatoriosComponent,
    UsuariosComponent,
    GruposComponent,
    PermissoesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatNativeDateModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatInputModule,

    SimpleNotificationsModule.forRoot(),
    NgbPaginationModule
  ],
  providers: [
    NotificationsService,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  entryComponents: [
  ],
  exports: [
    UsuariosComponent,
    GruposComponent,
    PermissoesComponent
  ]
})
export class RelatoriosModule { }
