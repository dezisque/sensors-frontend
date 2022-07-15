import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InputDataComponent } from './components/input-data/input-data.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'input',
    pathMatch: 'full',
  },
  {
    path: 'input',
    component: InputDataComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
