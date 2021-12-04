import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actor } from 'src/app/interface/actor';
import { Director } from 'src/app/interface/director';
import { Genero } from 'src/app/interface/genero';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { ObservadorService } from 'src/app/servicio/observador.service';

@Component({
  selector: 'app-dialog-open',
  templateUrl: './dialog-open.component.html',
  styleUrls: ['./dialog-open.component.scss']
})
export class DialogOpenComponent implements OnInit {

  titulo: string = '';
  agregar: string = '';
  label: string;
  constructor(
    public dialogRef: MatDialogRef<DialogOpenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string, value: Actor | Director | Genero },
    private api: ApiTrailerService,
    private notifcarCambios: ObservadorService) {
    this.label = data.value ? "Editar" : "Agregar"
    this.titulo = data.titulo
  }

  ngOnInit(): void {
    if (this.data.value) {
      this.agregar = this.data.value.nombre;
    }
  }

  ingresar(): void {
    if (!this.data.value) {
      console.log(this.data.titulo)
      if ('actor' === this.data.titulo) this.addActor();

      if ('director' === this.data.titulo){ console.log(this.data.titulo); this.addDirector();}

      if ('genero' === this.data.titulo) this.addGenero();
    } else {
      if ('actor' === this.data.titulo)this.editarActor();

      if ('director' === this.data.titulo)this.editarDirector();

      if ('genero' === this.data.titulo)this.editarGenero();
    }
  }

  editarGenero() {
    this.data.value.nombre = this.agregar;
    this.api.putGenero(this.data.value).subscribe(
      (res: Genero) => this.notifcarCambios.generoEventEditar.emit(this.data.value),
      err => console.log(err)
    );
  }

  editarDirector() {
    this.data.value.nombre = this.agregar;
    this.api.putDirector(this.data.value).subscribe(
      (res: Director) => this.notifcarCambios.directorEventEditar.emit(this.data.value),
      err => console.log(err)
    );
  }

  editarActor() {
    this.data.value.nombre = this.agregar;
    this.api.putActor(this.data.value).subscribe(
      (res: Actor) => this.notifcarCambios.actorEventEditar.emit(this.data.value),
      err => console.log(err)
    );
  }

  addDirector() {
    console.log('asd')
    let value: Director = { id: 0, nombre: this.agregar }
    this.api.postDirector(value).subscribe((res: Director) => {
      this.notifcarCambios.directorEvent.emit(res);
    }, err => {
      console.error(err)
    });
  }

  addActor() {
    let value: Actor = { id: 0, nombre: this.agregar }
    this.api.postActor(value).subscribe((res: Actor) => {
      this.notifcarCambios.actorEvent.emit(res);
    }, err => {
      console.error(err);
    });
  }

  addGenero() {
    let value: Genero = { id: 0, nombre: this.agregar }
    this.api.postGenero(value).subscribe((res: Genero) => {
      this.notifcarCambios.generoEvent.emit(res);
    }, err => {
      console.error(err);
    });
  }
}
