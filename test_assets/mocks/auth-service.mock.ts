import { Injectable } from '@angular/core';
import { AuthService } from '../../src/services/auth/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockAuthService extends AuthService {
  /**
   * Constructor
   */

  constructor() {
    const http = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) });
    const snackBar = jasmine.createSpyObj('CustomSnackbarService', { post: of({}), get: of({}) });
    const apiService = jasmine.createSpyObj('CustomApiService', { post: of({}), get: of({}), getApiUrl: of() });
    const inj = jasmine.createSpyObj('Injector', { post: of({}), get: of({}) });
    const router = jasmine.createSpyObj('Router', { post: of({}), get: of({}) });
    const spaceOwnerService = jasmine.createSpyObj('SpaceOwnerService', { post: of({}), get: of({}) });
    const socialLogin = jasmine.createSpyObj('SocialLoginService', { post: of({}), get: of({}) });
    super(http, snackBar, router, apiService, socialLogin, spaceOwnerService);
  }

  override login(): Observable<boolean> {
    return of();
  }

  override fillUserData(remember?: boolean) {
    return of();
  }

  override loggedIn(): boolean {
    return true;
  }

  override logout() {
    return;
  }

  override checkLoginAndRedirect(loginOK: boolean) {
    return;
  }

  override loginMock() {
    return;
  }
}
