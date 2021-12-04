import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObservadorService } from 'src/app/servicio/observador.service';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent implements OnInit {

  estado: string = 'Iniciando...'
  constructor( public dialogRef: MatDialogRef<CargandoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: string,
    private notificar: ObservadorService
  ){ 
    if(data) this.estado = data
  }

  
  ngOnInit(): void {
    this.getEsetado();
  }
  getEsetado() {
   this.notificar.cambiosEvento.subscribe( value => {
     this.estado = value.mesage;
     if(value.terminado)
      this.dialogRef.close();
   });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
