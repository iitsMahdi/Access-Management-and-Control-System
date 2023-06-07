import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../Service/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: UserAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api/v1/auth/authenticate') || req.url.includes('websocket')||req.url.includes('/auth/Reload-refresh-token')) {
      // Skip adding the token for login and WebSocket requests
      return next.handle(req);
    }

    const token = this.authService.getToken();
    const refreshToken = this.authService.getRefToken();

    // Set the Authorization header based on the request type
    let modifiedReq: HttpRequest<any>;
    if (req.url.includes('/auth/refresh-token')) {
      // Set the Authorization header with the refresh token
      console.warn(refreshToken)
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${refreshToken}`
        }
      });
    } else {
      // Set the Authorization header with the access token
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Proceed with the modified request
    return next.handle(modifiedReq);
  }
}
