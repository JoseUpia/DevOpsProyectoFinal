import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeadInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = this.cookie.get('token')
    let req;
    if (token) {
      req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://localhost:4200"
        }
      });
    } else {
      req = request.clone(
        { headers: request.headers.set("Access-Control-Allow-Origin", "http://localhost:4200") }
      );
    }
    return next.handle(req);
  }
}
