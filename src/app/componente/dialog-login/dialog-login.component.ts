import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Administrador } from 'src/app/interface/administrador';
import { Login } from 'src/app/interface/login';
import { ApiTrailerService } from 'src/app/servicio/api-trailer.service';
import { ObservadorService } from 'src/app/servicio/observador.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    correo: [''],
    contrasena: ['']
  });
  login: boolean  = false
  listo: boolean = false;
  @ViewChild('span') span?: ElementRef<HTMLSpanElement>;

  constructor(

    private formBuilder: FormBuilder,
    private api: ApiTrailerService, 
    private cookie: CookieService,
    private notificar: ObservadorService,
    private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  iniciar(): void {
    this.cargar();
    let value: Login = { email: this.loginForm.value.correo, contrasena: this.loginForm.value.contrasena }
    this.api.login(value).subscribe((res: Administrador) => {
      this.cookie.set('token', res.autorizacion)
      this.cookie.set('usuario', res.nombre)
      this.span?.nativeElement.classList.remove("spinner-border","spinner-border-sm")
      this.notificar.login.emit(true);
      this.dialogRef.closeAll()      
    }, err => {
      console.log(err)
      this.span?.nativeElement.classList.remove("spinner-border","spinner-border-sm")
      this.login = true
    });

  }
  cargar() {
    this.span?.nativeElement.classList.add("spinner-border", "spinner-border-sm")
  }
}
