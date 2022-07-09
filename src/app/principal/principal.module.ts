import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { RelatoriosModule } from '../relatorios/relatorios.module';
import { PrincipalComponent } from './principal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { GrupoComponent } from './grupo/grupo.component';
import { PermissaoComponent } from './permissao/permissao.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    UsuarioComponent,
    GrupoComponent,
    PermissaoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,

    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,

    NgbPaginationModule,

    RelatoriosModule
  ],
  exports: [PrincipalComponent],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class PrincipalModule { }
