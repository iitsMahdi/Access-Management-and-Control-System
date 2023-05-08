import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../Service/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService :UserAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // check if the request URL is the login endpoint
    if (req.url.includes('/api/v1/auth') || req.url.includes('websocket')) {
      // do not add the token to the headers for the login request
      return next.handle(req);
    }
    // add the token to the headers for all other requests
        req=req.clone({
          headers:req.headers.set("Authorization", "Bearer "+this.authService.getToken())
        })
        return next.handle(req);
  }
}
