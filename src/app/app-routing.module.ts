import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './componente/card/card.component';
import { VerTrailerDialogoComponent } from './componente/ver-trailer-dialogo/ver-trailer-dialogo.component';
import { AdministradorGuard } from './guard/administrador.guard';
import { AdministradorComponent } from './vista/administrador/administrador.component';
import { PrincipalComponent } from './vista/principal/principal.component';
import { RegistralTrailerComponent } from './vista/registral-trailer/registral-trailer.component';

const routes: Routes = [
  { path: '',component: PrincipalComponent, pathMatch:'full'},
  { path: 'Administrador', component: AdministradorComponent, canActivate: [AdministradorGuard]},
  { path: 'Principal', component: PrincipalComponent},
  { path: 'Registral_Trailer', component: RegistralTrailerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
