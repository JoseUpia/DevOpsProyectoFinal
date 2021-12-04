import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from '../interface/actor';
import { Trailer } from '../interface/trailer';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, args: any): any {

    const resul = [];
    for(const elemento of value){
      if (elemento.nombre.toLowerCase().indexOf(args.toLowerCase()) > -1){
        resul.push(elemento);
      }
    }
     return resul;
   }
}
