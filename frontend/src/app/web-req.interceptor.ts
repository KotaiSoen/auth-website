import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, empty, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { MidAuthService } from './mid-auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {

  constructor(private midService: MidAuthService) { }

  refreshingAccessToken!: boolean;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);

        if (err.status === 401 && !this.refreshingAccessToken) {
          return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                request = this.addAuthHeader(request);
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log(err);
                this.midService.logout();
                return EMPTY;
              })
            )
        }
        return throwError(err);
      })
    )
  }

  refreshAccessToken() {
    this.refreshingAccessToken = true;
    return this.midService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false;
        console.log('Access Token is refreshed')
      })
    )
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.midService.getAccessToken();

    if(token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
