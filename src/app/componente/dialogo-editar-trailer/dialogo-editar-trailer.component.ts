import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Actor } from 'src/app/interface/actor';
import { ActorList } from 'src/app/interface/actor-list';
import { Director } from 'src/app/interface/director';
import { DirectorList } from 'src/app/interface/director-list';
import { Genero } from 'src/app/interface/genero';
import { GeneroList } from 'src/app/interface/genero-list';
import { Trailer } from 'src/app/interface/trailer';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { ObservadorService } from 'src/app/servicio/observador.service';
import { CardComponent } from '../card/card.component';
import { CargandoComponent } from '../cargando/cargando.component';
import { DialogOpenComponent } from '../dialog-open/dialog-open.component';

@Component({
  selector: 'app-dialogo-editar-trailer',
  templateUrl: './dialogo-editar-trailer.component.html',
  styleUrls: ['./dialogo-editar-trailer.component.scss']
})
export class DialogoEditarTrailerComponent implements OnInit {

  i: number = 1
  trailerFormGroup: FormGroup = this.formBuild.group({
    urlVideo: [''],
    urlImagen: [''],
    titulo: [''],
    ano: [''],
    sinopsis: ['']
  });


  //Seleccionar
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  actorCtrl = new FormControl();
  directorCtrl = new FormControl();
  generoCtrl = new FormControl();

  filteredActors?: Observable<Actor[]>;
  filteredDirector?: Observable<Actor[]>;
  filteredGenero?: Observable<Actor[]>;

  actorList: Actor[] = [];
  directorList: Director[] = []
  generoList: Genero[] = []

  allActor: Actor[] = [];
  allDirector: Director[] = []
  allGenero: Genero[] = []

  @ViewChild('actorInput') actorInputR?: ElementRef<HTMLInputElement>;
  @ViewChild('actorInput') directorInputR?: ElementRef<HTMLInputElement>;
  @ViewChild('actorInput') generoInputR?: ElementRef<HTMLInputElement>;

  constructor(
    private formBuild: FormBuilder,
    public dialogRef: MatDialogRef<DialogoEditarTrailerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Trailer,
    private dialog: DialogoService,
    private api: ApiTrailerService,
    private notificar: ObservadorService) {
    this.carga();
  }
  carga() {
    this.trailerFormGroup.controls['titulo'].setValue(this.data.titulo)
    this.trailerFormGroup.controls['ano'].setValue(this.data.ano);
    this.trailerFormGroup.controls['urlImagen'].setValue(this.data.urlImagen);
    this.trailerFormGroup.controls['urlVideo'].setValue(this.data.urlVideo);
    this.trailerFormGroup.controls['sinopsis'].setValue(this.data.sinopsis);
  }

  notificacion() {
    this.notificar.actorEvent.subscribe(
      (res: Actor) => this.actorList.push(res),
      err => console.error(err)
    )

    this.notificar.directorEvent.subscribe(
      (res: Director) => this.directorList.push(res),
      err => console.error(err)
    )

    this.notificar.generoEvent.subscribe(
      (res: Genero) => this.generoList.push(res),
      err => console.error(err)
    )
  }

  ngOnInit(): void {
    this.get();
    this.notificacion();
  }

  openDialog(value: string): void {
    this.dialog.openDialog(DialogOpenComponent, { titulo: value })
  }

  actorFiltro() {
    this.filteredActors = this.actorCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filterActor(value) : this.allActor.slice())
    );
  }

  directorFiltro() {
    this.filteredDirector = this.directorCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filterDirector(value) : this.allDirector.slice())
    );
  }

  generoFiltro() {
    this.filteredGenero = this.generoCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filterGenero(value) : this.allGenero.slice())
    );
  }

  registral(): void {
    this.dialog.openDialog(CargandoComponent, "Actualizando cambios");
    let trailer: Trailer = this.trailerFormGroup.value
    trailer.id = this.data.id;
    this.api.putTrailer(trailer).subscribe((res: Trailer) => {
      console.log(res);
      this.notificar.cambiosEvento.emit({ mesage: "Listo...", terminado: true })
    },
      err => console.error(err));
  }


  get() {
    this.api.getActor().subscribe((actors: Actor[]) => {
      this.data.listActor.forEach( (x: any) => {
        this.actorList.push(x.actor);
        this.eliminar(actors, x.actor)
      });
      this.allActor = actors;
      this.actorFiltro();
    }, err => {
      console.error(err);
    });

    this.api.getDirector().subscribe((director: Director[]) => {
      this.data.listDirecto.forEach( (x: any) => {
        this.directorList.push(x.director);
        this.eliminar(this.allDirector, x.director)
      });
      this.allDirector = director;
      this.directorFiltro();
    }, err => {
      console.error(err);
    });

    this.api.getGenero().subscribe((genero: Genero[]) => {

      this.data.listGenero.forEach( (x: any) => {
        this.generoList.push(x.genero);
        this.eliminar(this.allGenero, x.genero)
      });
      this.allGenero = genero;
      this.generoFiltro()
    }, err => {
      console.error(err);
    });
  }

  eliminar(list: any[], elem: any) {
    let i = list.indexOf(elem);
    list.splice(i, 1);
  }
  addActorList(actor: Actor) {
    this.dialog.openDialog(CargandoComponent, "Agregando...");
    let al: ActorList = { idActor: actor.id, idTrailer: this.data.id }
    this.api.postListActor(al).subscribe(() => {
      this.notificar.cambiosEvento.emit({ mesage: "Listo", terminado: true })
    });

    // Add our fruit
    this.actorList.push(actor);
    this.api.postActor(actor);

    let index = this.allActor.indexOf(actor);
    if (index >= 0)
      this.allActor.splice(index, 1);

  }

  addDirectorList(value: Director) {
    this.dialog.openDialog(CargandoComponent, "Agregando...");
    let al: DirectorList = { idDirecto: value.id, idTrailer: this.data.id }
    this.api.postListDirector(al).subscribe(() => {
      this.notificar.cambiosEvento.emit({ mesage: "Listo", terminado: true })
    });

    this.directorList.push(value);

    let index = this.allDirector.indexOf(value);
    if (index >= 0)
      this.allDirector.splice(index, 1);

  }

  addGeneroList(value: Genero) {
    this.dialog.openDialog(CargandoComponent, "Agregando...");
    let al: GeneroList = { idGenero: value.id, idTrailer: this.data.id }
    this.api.postListGenero(al).subscribe(() => {
      this.notificar.cambiosEvento.emit({ mesage: "Listo", terminado: true })
    });

    this.generoList.push(value);

    let index = this.allGenero.indexOf(value);
    if (index >= 0)
      this.allGenero.splice(index, 1);

  }

  removeActorList(actor: Actor | Director) {
    this.dialog.openDialog(CargandoComponent, "Agregando...");
    let al: ActorList = { idActor: actor.id, idTrailer: this.data.id }
    this.api.deleteActorList(al).subscribe(() => {
      this.notificar.cambiosEvento.emit({ mesage: "Listo", terminado: true })
    });

    this.allActor.push(actor);
    let index = this.actorList.indexOf(actor);

    if (index >= 0)
      this.actorList.splice(index, 1);

  }

  removeDirectorList(value: Director) {
    this.dialog.openDialog(CargandoComponent, "Agregando...");
    let al: DirectorList = { idDirecto: value.id, idTrailer: this.data.id }
    this.api.deleteDirectorList(al).subscribe(() => {
      this.notificar.cambiosEvento.emit({ mesage: "Listo", terminado: true })
    });

    this.allDirector.push(value);
    let index = this.directorList.indexOf(value);

    if (index >= 0)
      this.directorList.splice(index, 1);
  }

  removeGeneroList(value: Genero) {
    this.dialog.openDialog(CargandoComponent, "Agregando...");
    let al: GeneroList = { idGenero: value.id, idTrailer: this.data.id }
    this.api.deleteGeneroList(al).subscribe(() => {
      this.notificar.cambiosEvento.emit({ mesage: "Listo", terminado: true })
    });

    this.allGenero.push(value);
    let index = this.generoList.indexOf(value);

    if (index >= 0)
      this.generoList.splice(index, 1);
  }

  selectedActor(event: MatAutocompleteSelectedEvent): void {
    this.directorList.push(event.option.value);
    if (this.actorInputR) this.actorInputR.nativeElement.value = '';
    this.actorCtrl.setValue('');
  }

  selectedDirector(event: MatAutocompleteSelectedEvent): void {
    this.directorList.push(event.option.value);
    if (this.directorInputR) this.directorInputR.nativeElement.value = '';
    this.directorCtrl.setValue('');
  }

  selectedGenero(event: MatAutocompleteSelectedEvent): void {
    this.generoList.push(event.option.value);
    if (this.generoInputR) this.generoInputR.nativeElement.value = '';
    this.generoCtrl.setValue('');
  }

  private _filterActor(value: string): Actor[] {

    const filterValue = value.toLowerCase();
    return this.allActor.filter(actor => actor.nombre.toLowerCase().includes(filterValue));

  }

  private _filterDirector(value: string): Director[] {

    const filterValue = value.toLowerCase();
    return this.allDirector.filter(v => v.nombre.toLowerCase().includes(filterValue));
  }

  private _filterGenero(value: string): Genero[] {

    const filterValue = value.toLowerCase();
    return this.allGenero.filter(v => v.nombre.toLowerCase().includes(filterValue));
  }

}
