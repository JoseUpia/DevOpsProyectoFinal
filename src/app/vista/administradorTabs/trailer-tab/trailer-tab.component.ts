import { Component, OnInit } from '@angular/core';
import { VerTrailerDialogoComponent } from 'src/app/componente/ver-trailer-dialogo/ver-trailer-dialogo.component';
import { Trailer } from 'src/app/interface/trailer';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { ObservadorService } from 'src/app/servicio/observador.service';

@Component({
  selector: 'app-trailer-tab',
  templateUrl: './trailer-tab.component.html',
  styleUrls: ['./trailer-tab.component.scss']
})
export class TrailerTabComponent implements OnInit {

  filtro: string = '';
  prueba: any;

  trailer: Trailer[] = []
  constructor(private api: ApiTrailerService,
    private openDialog: DialogoService,
    private notificar: ObservadorService) { }

  ngOnInit(): void {
    this.getTrailer();
    this.notificar.updataTrialer.subscribe( () => this.getTrailer());
  }

  getTrailer() {
    this.trailer[0]
    this.api.getTrailer().subscribe( (res: Trailer[]) => {
      this.trailer = res;   
    }, err => {
      console.error(err)
    });
  }
  
  ver(value: Trailer): void {
    this.openDialog.openDialog(VerTrailerDialogoComponent, value)
  }
}
