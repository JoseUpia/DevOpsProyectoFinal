import { Component, OnInit } from '@angular/core';
import { CargandoComponent } from 'src/app/componente/cargando/cargando.component';
import { VerTrailerDialogoComponent } from 'src/app/componente/ver-trailer-dialogo/ver-trailer-dialogo.component';
import { Trailer } from 'src/app/interface/trailer';
import { LiSTDATA } from 'src/app/mocks/data';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { ObservadorService } from 'src/app/servicio/observador.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  listTrailer: Trailer[] = []
  constructor(
    private api: ApiTrailerService,
    private openDialog: DialogoService,
    private notidicar: ObservadorService) { }
    
    filtro: string = '';

  ngOnInit(): void {
    this.getTrailer();
  }
  getTrailer() {
    this.openDialog.openDialog(CargandoComponent, "Cargando...");
    this.api.getTrailer().subscribe( 
      (res: Trailer[]) => {
        this.notidicar.cambiosEvento.emit({mesage: "Terminado", terminado: true})
        this.listTrailer = res
      },err => {
        console.error(err)
        this.notidicar.cambiosEvento.emit({mesage: err, terminado: false})
      }
      );
      this.api.evento.emit(LiSTDATA);
  }

  ver(value: Trailer): void{
    this.openDialog.openDialog(VerTrailerDialogoComponent, value)
  }
}
