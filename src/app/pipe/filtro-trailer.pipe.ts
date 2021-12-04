import { Pipe, PipeTransform } from '@angular/core';
import { Trailer } from '../interface/trailer';

@Pipe({
  name: 'filtroTrailer'
})
export class FiltroTrailerPipe implements PipeTransform {

  transform(value: any, args: any): any {

    const resul = [];
    for (const elemento of value) {
      if (elemento.titulo.toLowerCase().indexOf(args.toLowerCase()) > -1) {
        resul.push(elemento);
      }
    }

    return resul;
  }
}