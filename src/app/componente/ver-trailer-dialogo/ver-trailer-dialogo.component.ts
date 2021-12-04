import { ElementRef, ViewChild } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Trailer } from 'src/app/interface/trailer';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { ObservadorService } from 'src/app/servicio/observador.service';
import { CargandoComponent } from '../cargando/cargando.component';
import { DialogoEditarTrailerComponent } from '../dialogo-editar-trailer/dialogo-editar-trailer.component';

let apiLoaded = false;

@Component({
  selector: 'app-ver-trailer-dialogo',
  templateUrl: './ver-trailer-dialogo.component.html',
  styleUrls: ['./ver-trailer-dialogo.component.scss']
})
export class VerTrailerDialogoComponent implements OnInit {

  login: boolean = true;

  constructor(
    private openDialog: DialogoService,
    public dialogRef: MatDialogRef<VerTrailerDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Trailer,
    private api: ApiTrailerService,
    private notificar: ObservadorService
    ){ 

    }

  ngOnInit(): void {
    this.isAdmit();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    apiLoaded = true;
  }
  isAdmit() {
    this.api.isValido().subscribe( res => this.login = res, () => this.login = false);
  }

  editarTrailer(value: Trailer): void{
    this.openDialog.openDialog(DialogoEditarTrailerComponent, value)
  }

  removerTrailer(data: Trailer): void {
    this.openDialog.openDialog(CargandoComponent, 'Eliminando: ' + data.titulo)
    this.api.deleterTrailer(data).subscribe( (res) => {
      this.notificar.updataTrialer.emit(true);
      this.notificar.cambiosEvento.emit({mesage: 'Listo', terminado: true})
    },err => { 
        console.error(err)
        this.notificar.cambiosEvento.emit({mesage: 'Error', terminado: true})
      });
  }
}
