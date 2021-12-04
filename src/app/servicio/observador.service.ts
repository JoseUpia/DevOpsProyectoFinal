import { EventEmitter, Injectable } from '@angular/core';
import { Actor } from '../interface/actor';
import { Director } from '../interface/director';
import { Genero } from '../interface/genero';

@Injectable({
  providedIn: 'root'
})
export class ObservadorService {

  public actorEvent: EventEmitter<Actor> = new EventEmitter<Actor>();
  public actorEventEditar: EventEmitter<Actor> = new EventEmitter<Actor>();
  public directorEvent: EventEmitter<Director> = new EventEmitter<Director>();
  public directorEventEditar: EventEmitter<Director> = new EventEmitter<Director>();
  public generoEvent: EventEmitter<Genero> = new EventEmitter<Genero>();
  public generoEventEditar: EventEmitter<Genero> = new EventEmitter<Genero>();
  public cambiosEvento: EventEmitter<{mesage: string, terminado: boolean}> = new EventEmitter<{mesage: string, terminado: boolean}>();
  public login: EventEmitter<boolean> = new EventEmitter<boolean>();
  public updataTrialer: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }
}
