import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
import { AppService } from './app.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private appService: AppService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      let newReq = req;
      let token = this.appService.getToken();
  
      // console.log('INTERCEPTOR ', token);
  
      if (token != null) {
        newReq = newReq.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }
  
      // console.log(newReq);
  
      return next.handle(newReq);
    }
  }
  