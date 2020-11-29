import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { Erro404Component } from './erro404/erro404.component';
import { LoginComponent } from './login/login.component';
import { LojaComponent } from './loja/loja.component';

const routes: Routes = [
  {
    path: "",
    component: LojaComponent
  },
  {
    path: "entrar",
    component: LoginComponent
  },
  {
    path: "cadastrar",
    component: CadastroComponent
  },
  {
    path: "carrinho",
    component: CarrinhoComponent
  },
  { path: '**', component: Erro404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
