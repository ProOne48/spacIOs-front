import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private inj = inject(Injector);

  /**
   * Auth service, used to refresh the token
   */
  authService: AuthService | undefined;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // We should get the AuthService like this to avoid circular dependencies
    this.authService = this.inj.get(AuthService);

    request = request.clone({
      withCredentials: true
    });

    // Handle the request
    return next.handle(request).pipe(
      catchError((error: any) => {
        // If the token is expired...
        switch (error.status) {
          case 401:
            // If session is expired, redirect to login
            this.authService?.logout();
            this.router.navigate(['/']);
            break;
          case 403:
            // If the user is not authorized, reload the profile data in case the permissions have changed
            this.authService?.fillUserData(false);
            break;
        }

        return observableThrowError(error);
      })
    );
  }
}
