import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LojaComponent } from './loja/loja.component';

const routes: Routes = [
  {
    path: "",
    component: LojaComponent
  },
  { path: '**', component: LojaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
