import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractsListComponent } from './components/contracts-list/contracts-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/contracts', pathMatch: 'full' },
  { path: 'contracts', component: ContractsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
