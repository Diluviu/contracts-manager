import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

import { ContractDetailComponent } from './components/contract-detail/contract-detail.component';
import { ContractEditComponent } from './components/contract-edit/contract-edit.component';
import { ContractsSummaryComponent } from './components/contracts-summary/contracts-summary.component';
import { ContractsListComponent } from './components/contracts-list/contracts-list.component';

@NgModule({
  declarations: [AppComponent, ContractsListComponent, ContractDetailComponent,
    ContractEditComponent, ContractsSummaryComponent],

  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,
    RouterModule, HttpClientModule, FormsModule, CommonModule],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
