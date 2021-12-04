import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogoService } from 'src/app/servicio/dialogo.service';
import { ObservadorService } from 'src/app/servicio/observador.service';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  logiado:boolean = false
  usuario: string = 'juniross'
  constructor(
    private cookie: CookieService,
    private openDialog: DialogoService,
    private notificar: ObservadorService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUsuario();
    this.notificar.login.subscribe( res => {
      this.logiado = res
      this.usuario = this.cookie.get('usuario')
    });
  }
  getUsuario() {
    let u = this.cookie.get('usuario')
    if(u){
      this.logiado = true;
      this.usuario = u
    }
  }

  salir(){
    this.cookie.deleteAll();
    this.router.navigate(['/Principal'])    
    this.logiado = false;
  }

  login(): void {
    this.openDialog.openDialog(DialogLoginComponent, {})
  }

}
