import { Component, OnInit } from '@angular/core';
import { DialogOpenComponent } from 'src/app/componente/dialog-open/dialog-open.component';
import { Director } from 'src/app/interface/director';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { ObservadorService } from 'src/app/servicio/observador.service';

@Component({
  selector: 'app-director-tab',
  templateUrl: './director-tab.component.html',
  styleUrls: ['./director-tab.component.scss']
})
export class DirectorTabComponent implements OnInit {

  filtro: string = "";
  directores: Director[] = [];

  constructor(
    private api: ApiTrailerService,
    private notificacion: ObservadorService,
    private openDialog: DialogoService) { }

  ngOnInit(): void {
    this.getDirector();
  }

  add(): void{
    this.openDialog.openDialog(DialogOpenComponent, {titulo: 'director'});
    this.notificacion.directorEvent.subscribe( 
      (res: Director) => this.directores.push(res)
    );
  }

  editar(value: Director): void {
    let index = this.directores.indexOf(value);
    this.openDialog.openDialog(DialogOpenComponent, {titulo: 'director', value: value});
    this.notificacion.directorEventEditar.subscribe( (res: Director) => {
      this.directores[index] =  res;
    });
  }

  remover(value: Director): void{
    this.api.deleteDirector(value).subscribe( (res: Director) => {
      let index = this.directores.indexOf(value);
      this.directores.splice(index, 1)
    }, err => console.error(err));
  }

  getDirector() {
    this.api.getDirector().subscribe( (res: Director[]) => {
      this.directores = res;
    }, err => {
      console.error(err);
    });
  }

}
