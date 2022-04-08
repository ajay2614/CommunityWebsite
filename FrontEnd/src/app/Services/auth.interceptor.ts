import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newReq = request;
    let token = this.loginService.getToken();

    if(newReq.url == 'http://localhost:8100/productStats' || newReq.url == 'http://localhost:8100/token' || 
    newReq.url == 'http://localhost:8100/register' || newReq.url == 'http://localhost:8100/userStats'  ||
    newReq.url == 'http://localhost:8100/productDetailsStats'|| newReq.url == 'http://localhost:8100/checkUser' ) {
    return next.handle(newReq);
    }
    else if(token!=null){
      newReq = newReq.clone({setHeaders:{Authorization:`Bearer ${token}`}});
    }
    return next.handle(newReq);
  }
}
