import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from './pages/detail/detail.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { QuatreCentQuatreComponent } from './pages/quatre-cent-quatre/quatre-cent-quatre.component';

/**
 * Graphe de routage des chemins accessibles via angular.
 */
const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'detail', component: DetailComponent },
  { path: 'not-found', component: QuatreCentQuatreComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
