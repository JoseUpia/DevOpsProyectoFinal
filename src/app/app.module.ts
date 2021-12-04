import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './componente/card/card.component';
import { AdministradorComponent } from './vista/administrador/administrador.component';
import { TrailerTabComponent } from './vista/administradorTabs/trailer-tab/trailer-tab.component';
import { ActorTabComponent } from './vista/administradorTabs/actor-tab/actor-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { GeneroTabComponent } from './vista/administradorTabs/genero-tab/genero-tab.component';
import { DirectorTabComponent } from './vista/administradorTabs/director-tab/director-tab.component';

import { PrincipalComponent } from './vista/principal/principal.component';
import { NavComponent } from './componente/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormularTrailerComponent } from './componente/formular-trailer/formular-trailer.component';
import { RegistralTrailerComponent } from './vista/registral-trailer/registral-trailer.component';

//Material
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOpenComponent } from './componente/dialog-open/dialog-open.component';
import { VerTrailerDialogoComponent } from './componente/ver-trailer-dialogo/ver-trailer-dialogo.component';
import { HeadInterceptor } from './servicio/head.interceptor';
import { DialogoEditarTrailerComponent } from './componente/dialogo-editar-trailer/dialogo-editar-trailer.component';
import { DialogLoginComponent } from './componente/dialog-login/dialog-login.component';
import { MensajeComponent } from './componente/mensaje/mensaje.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FooterComponent } from './componente/footer/footer.component';
import { CargandoComponent } from './componente/cargando/cargando.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FiltroPipe } from './pipe/filtro.pipe';
import { FiltroTrailerPipe } from './pipe/filtro-trailer.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AdministradorComponent,
    TrailerTabComponent,
    ActorTabComponent,
    GeneroTabComponent,
    DirectorTabComponent,
    PrincipalComponent,
    NavComponent,
    FormularTrailerComponent,
    RegistralTrailerComponent,
    DialogOpenComponent,
    VerTrailerDialogoComponent,
    DialogoEditarTrailerComponent,
    DialogLoginComponent,
    MensajeComponent,
    FooterComponent,
    CargandoComponent,
    FiltroPipe,
    FiltroTrailerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    YouTubePlayerModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
