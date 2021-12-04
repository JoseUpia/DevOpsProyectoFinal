import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpenComponent } from '../componente/dialog-open/dialog-open.component';

@Injectable({
  providedIn: 'root'
})
export class DialogoService {

  constructor(public dialog: MatDialog) { }
  
  openDialog(component: ComponentType<any>, data: any) {
    const dialogRef = this.dialog.open(component,
      {
        data: data
      });
  }
}
