import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../environments/webAPI';
import { Actor } from '../interface/actor';
import { ActorList } from '../interface/actor-list';
import { Administrador } from '../interface/administrador';
import { Director } from '../interface/director';
import { DirectorList } from '../interface/director-list';
import { Genero } from '../interface/genero';
import { GeneroList } from '../interface/genero-list';
import { Login } from '../interface/login';
import { Trailer } from '../interface/trailer';
import { LiSTDATA } from '../mocks/data';

@Injectable({
  providedIn: 'root'
})
export class ApiTrailerService {
  
  evento = new EventEmitter<Trailer[]>()

  constructor(private http: HttpClient) { }

  login(value: Login): Observable<Administrador> {
    return this.http.post<Administrador>(config.host + "api/Administradors/Validars", value)
  }

  isValido(): Observable<boolean>{
    return this.http.get<boolean>(config.host+"api/Validar");
  }
  //Trailer
  getTrailer(): Observable<Trailer[]> {
    return this.evento
  }

  postTrailer(value: Trailer): Observable<Trailer> {
    return this.http.post<Trailer>(config.host + 'api/Trailers', value);
  }

  putTrailer(value: Trailer): Observable<Trailer> {
    return this.http.put<Trailer>(config.host + `api/Trailers/${value.id}`, value)
  }

  deleterTrailer(value: Trailer): Observable<Trailer> {
    return this.http.delete<Trailer>(config.host + `api/Trailers/${value.id}`)
  }

  //Actor
  getActor(): Observable<Actor[]> {
    return this.http.get<Actor[]>(config.host + 'api/Actors');
  }

  postActor(value: Actor): Observable<Actor> {
    return this.http.post<Actor>(config.host + 'api/Actors', value);
  }

  postListActor(value: ActorList): Observable<ActorList> {
    return this.http.post<ActorList>(config.host + 'api/ListActors', value);
  }

  putActor(value: Actor): Observable<Actor> {
    return this.http.put<Actor>(config.host + `api/Actors/${value.id}`, value)
  }

  deleteActor(value: Actor): Observable<Actor> {
    console.log(value.id)
    return this.http.delete<Actor>(config.host + "api/Actors/" + value.id)
  }

  deleteActorList(value: ActorList): Observable<ActorList> {
    return this.http.delete<ActorList>(config.host + "api/ListActors/" + value.idTrailer + "/" + value.idActor);
  }

  //Director
  getDirector(): Observable<any> {
    return this.http.get(config.host + 'api/Directors');
  }

  postDirector(value: Director): Observable<Director> {
    return this.http.post<Director>(config.host + 'api/Directors', value);
  }

  postListDirector(value: DirectorList): Observable<DirectorList> {
    return this.http.post<DirectorList>(config.host + 'api/ListDirectoes', value);
  }

  putDirector(value: Director): Observable<Director> {
    return this.http.put<Director>(config.host + `api/Directors/${value.id}`, value)
  }

  deleteDirector(value: Director): Observable<Director> {///api/Directors/{id}
    return this.http.delete<Director>(config.host + "api/Directors/" + value.id)
  }
  
  deleteDirectorList(value: DirectorList): Observable<DirectorList> {
    return this.http.delete<DirectorList>(config.host + "api/ListDirectoes/" + value.idTrailer + "/" + value.idDirecto);
  }

  //Genero
  getGenero(): Observable<any> {
    return this.http.get(config.host + 'api/Generoes')
  }

  postGenero(value: Genero): Observable<Genero> {
    return this.http.post<Genero>(config.host + 'api/Generoes', value);
  }

  postListGenero(value: GeneroList): Observable<GeneroList> {
    return this.http.post<GeneroList>(config.host + 'api/ListGeneroes', value);
  }

  putGenero(value: Genero): Observable<Genero> {
    return this.http.put<Genero>(config.host + `api/Generoes/${value.id}`, value)
  }

  deleteGenero(value: Genero): Observable<any> {
    return this.http.delete<any>(config.host + "api/Generoes/" + value.id)
  }

  deleteGeneroList(value: GeneroList): Observable<GeneroList> {
    return this.http.delete<GeneroList>(config.host + "api/ListGeneroes/" + value.idTrailer + "/" + value.idGenero);
  }
}
