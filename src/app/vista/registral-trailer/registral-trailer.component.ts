import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Actor } from 'src/app/interface/actor';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { Director } from 'src/app/interface/director';
import { Genero } from 'src/app/interface/genero';
import { Trailer } from 'src/app/interface/trailer';
import { ActorList } from 'src/app/interface/actor-list';
import { DirectorList } from 'src/app/interface/director-list';
import { GeneroList } from 'src/app/interface/genero-list';
import { MatDialog } from '@angular/material/dialog';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { DialogOpenComponent } from 'src/app/componente/dialog-open/dialog-open.component';
import { ObservadorService } from 'src/app/servicio/observador.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registral-trailer',
  templateUrl: './registral-trailer.component.html',
  styleUrls: ['./registral-trailer.component.scss']
})
export class RegistralTrailerComponent implements OnInit {

  //Formolario
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

  @ViewChild('actorInput') actorInput?: ElementRef<HTMLInputElement>;
  @ViewChild('actorInput') directorInputR?: ElementRef<HTMLInputElement>;
  @ViewChild('actorInput') generoInputR?: ElementRef<HTMLInputElement>;

  constructor(
    private formBuild: FormBuilder,
    private api: ApiTrailerService,
    public dialog: DialogoService,
    private notificar: ObservadorService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.get();
    this.notificacion();
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

  openDialog(value: string): void {
    this.dialog.openDialog(DialogOpenComponent, {titulo: value})
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
    let id: number;
    this.api.postTrailer(this.trailerFormGroup.value).subscribe((res: Trailer) => {
      console.log(res);
      id = res.id;
      this.relaciones(id);

    });

  }

  relaciones(id: number) {
    this.actorList.forEach(x => {
      let list: ActorList = { idTrailer: id, idActor: x.id };
      this.api.postListActor(list).subscribe();
    });

    this.directorList.forEach(x => {
      let list: DirectorList = { idTrailer: id, idDirecto: x.id };
      this.api.postListDirector(list).subscribe();
    });

    this.generoList.forEach(x => {
      let list: GeneroList = { idTrailer: id, idGenero: x.id };
      this.api.postListGenero(list).subscribe();
    });

    this.router.navigate(['/Administrador'])
  }

  

  get() {
    this.api.getActor().subscribe((actors: Actor[]) => {
      this.allActor = actors;
      this.actorFiltro();
    }, err => {
      console.error(err);
    });

    this.api.getDirector().subscribe((director: Director[]) => {
      this.allDirector = director;
      this.directorFiltro();
    }, err => {
      console.error(err);
    });

    this.api.getGenero().subscribe((genero: Genero[]) => {
      this.allGenero = genero
      this.generoFiltro()
    }, err => {
      console.error(err);
    });
  }

  addActor(actor: Actor) {
    console.log(actor);

    // Add our fruit
    this.actorList.push(actor);

    let index = this.allActor.indexOf(actor);
    if (index >= 0)
      this.allActor.splice(index, 1);

  }

  addDirector(value: Director) {
    console.log(value);

    // Add our fruit
    this.directorList.push(value);

    let index = this.allDirector.indexOf(value);
    if (index >= 0)
      this.allDirector.splice(index, 1);

  }

  addGenero(value: Genero) {
    console.log(value);

    // Add our fruit
    this.generoList.push(value);

    let index = this.allGenero.indexOf(value);
    if (index >= 0)
      this.allGenero.splice(index, 1);

  }

  removeActor(actor: Actor | Director) {
    this.allActor.push(actor);
    let index = this.actorList.indexOf(actor);

    if (index >= 0)
      this.actorList.splice(index, 1);

  }

  removeDirector(value: Director) {

    this.allDirector.push(value);
    let index = this.directorList.indexOf(value);

    if (index >= 0)
      this.directorList.splice(index, 1);
  }

  removeGenero(value: Genero) {

    this.allGenero.push(value);
    let index = this.generoList.indexOf(value);

    if (index >= 0)
      this.generoList.splice(index, 1);
  }

  selectedActor(event: MatAutocompleteSelectedEvent): void {
    this.directorList.push(event.option.value);
    if (this.actorInput) this.actorInput.nativeElement.value = '';
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
