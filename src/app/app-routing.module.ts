import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './Component/add/add.component';
import { BillComponent } from './Component/bill/bill.component';
import { ViewComponent } from './Component/view/view.component';
import { HomeComponent } from './Component/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Default route to HomeComponent
  { path: 'add', component: AddComponent }, // Route to AddComponent
  { path: 'bill', component: BillComponent }, // Route to BillComponent
  { path: 'view', component: ViewComponent }, // Route to ViewComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 