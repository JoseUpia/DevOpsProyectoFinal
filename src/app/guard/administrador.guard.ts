import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MensajeComponent } from '../componente/mensaje/mensaje.component';
import { ApiTrailerService } from '../servicio/api-trailer.service';
import { DialogoService } from '../servicio/dialogo.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {

  constructor(private openDialog: DialogoService, private api: ApiTrailerService, private cookie: CookieService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = this.cookie.get("token");
      if(!token){
        console.log(token)
        this.openDialog.openDialog(MensajeComponent, {mensaje: "No esta autenticado.", titulo:'No autorizado.'})
        return false
      }

      let valido: boolean = true; 
      this.api.isValido().subscribe( 
        res => valido = res,
        res => valido = false
      );
        console.log('guard' + valido);

        if(!valido) {
          this.cookie.deleteAll();
          this.router.navigate(["/Principal"]);
        }
    return valido;
  }
  
}
