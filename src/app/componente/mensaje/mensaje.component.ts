import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {

  mensaje: string  ='Sin mensaje';
  titulo: string = ''
  constructor(
    public dialogRef: MatDialogRef<MensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mensaje: string,titulo:string, tipo:string}) 
    { 
      this.titulo = data.titulo;
      this.mensaje = data.mensaje;
    }

  ngOnInit(): void {

  }

}
