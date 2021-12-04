import { Component, OnInit } from '@angular/core';
import { DialogOpenComponent } from 'src/app/componente/dialog-open/dialog-open.component';
import { Actor } from 'src/app/interface/actor';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { ObservadorService } from 'src/app/servicio/observador.service';

@Component({
  selector: 'app-actor-tab',
  templateUrl: './actor-tab.component.html',
  styleUrls: ['./actor-tab.component.scss']
})
export class ActorTabComponent implements OnInit {

  filtro: string = ''
  actors: Actor[] = [];
  constructor(
    private api: ApiTrailerService,
    private openDialog: DialogoService,
    private notificacion: ObservadorService) { }

  ngOnInit(): void {
    this.getActor();
  }

  add(): void{
    this.openDialog.openDialog(DialogOpenComponent, {titulo: 'actor'});
    this.notificacion.actorEvent.subscribe( 
      (res: Actor) => this.actors.push(res)
    );
  }

  editar(value: Actor): void {
    let index = this.actors.indexOf(value);
    this.openDialog.openDialog(DialogOpenComponent, {titulo: 'actor', value: value});
    this.notificacion.actorEventEditar.subscribe( (res: Actor) => {
      this.actors[index] =  res;
    });
  }

  remover(value: Actor): void {
    this.api.deleteActor(value).subscribe( (res: Actor) => {
      let index = this.actors.indexOf(value);
      this.actors.splice(index, 1)
    }, err => console.error(err));
  }

  getActor() {
    this.api.getActor().subscribe( (res: Actor[]) => {
      this.actors = res;
    }, err => {
      console.error(err);
    });
  }

}
