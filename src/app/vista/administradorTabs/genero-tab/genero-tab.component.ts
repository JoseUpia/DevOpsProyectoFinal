import { Component, OnInit } from '@angular/core';
import { DialogOpenComponent } from 'src/app/componente/dialog-open/dialog-open.component';
import { Genero } from 'src/app/interface/genero';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { ObservadorService } from 'src/app/servicio/observador.service';

@Component({
  selector: 'app-genero-tab',
  templateUrl: './genero-tab.component.html',
  styleUrls: ['./genero-tab.component.scss']
})
export class GeneroTabComponent implements OnInit {

  filtro: string = '';
  generos: Genero[] = [];
  constructor(
    private api: ApiTrailerService,
    private notificacion: ObservadorService,
    private openDialog: DialogoService ) { }

  ngOnInit(): void {
    this.getGenero();
  }

  
  add(): void{
    this.openDialog.openDialog(DialogOpenComponent, {titulo: 'genero'});
    this.notificacion.generoEvent.subscribe( 
      (res: Genero) => this.generos.push(res)
    );
  }

  editar(value: Genero): void {
    let index = this.generos.indexOf(value);
    this.openDialog.openDialog(DialogOpenComponent, {titulo: 'genero', value: value});
    this.notificacion.generoEventEditar.subscribe( (res: Genero) => {
      this.generos[index] =  res;
    });
  }

  remover(value: Genero): void {  
    this.api.deleteGenero(value).subscribe( (res: Genero) => {
      let index = this.generos.indexOf(value);
      this.generos.splice(index, 1)
    }, err => console.error(err));
  }

  getGenero() {
    this.api.getGenero().subscribe( (res: Genero[]) => {
      this.generos = res;
    }, err => {
      console.error(err);
    });
  }
}
