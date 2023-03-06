import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../authorizing/services/authorize.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authorizeService: AuthorizeService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authorizeService.getToken();
    const customReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(customReq);
  }
}
