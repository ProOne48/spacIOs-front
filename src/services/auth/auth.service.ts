import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

import { GoogleCredentialsInterface } from '../../definitions/credentials.interface';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../../models/login-response';
import { SpaceOwner } from '../../models/space-owner';
import { getStorageObject, removeStorageObject, setStorageObject } from '../../utils/storage-manager';
import { ApiService } from '../api.service';
import { SpaceOwnerService } from '../space-owner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);
  private apiService = inject(ApiService);
  private socialAuthService = inject(SocialAuthService);
  private spaceOwnerService = inject(SpaceOwnerService);

  /**
   * API path
   */
  path = '/auth';

  /**
   * Constructor
   *
   * @param http
   * @param snackbar
   * @param router
   * @param apiService
   * @param socialAuthService
   * @param spaceOwnerService
   */
  constructor() {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  login(loginData: GoogleCredentialsInterface): Observable<boolean> {
    const loginOkSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    this.http
      .post(`${this.path}/google-login`, loginData)
      .pipe(map((response: any) => Deserialize(response, () => LoginResponse)))
      .subscribe(
        (data: any) => {
          if (data.loginOk) {
            loginOkSubject.next(true);
            this.fillUserData(loginData.remember);
          }
        },
        (error: any) => {
          this.snackbar.open(error.error.message, '', {
            duration: 5000
          });
        }
      );

    loginOkSubject.asObservable().subscribe((loginOk) => {
      this.checkLoginAndRedirect(loginOk, loginData.remember);
    });

    return loginOkSubject.asObservable();
  }

  loginMock(): void {
    const token = environment.mockToken;
    const credentials: GoogleCredentialsInterface = {
      email: 'mock@gmail.com',
      name: 'mock',
      token: token,
      remember: true
    };

    this.login(credentials).subscribe((loginOk: boolean) => {
      this.checkLoginAndRedirect(loginOk, credentials.remember);
    });
  }

  checkLoginAndRedirect(loginOK: boolean, remember?: boolean): void {
    if (loginOK) {
      this.fillUserData(remember).subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    }
  }

  logout(): void {
    this.http.delete(`${this.path}/logout`).subscribe(() => {
      this.socialAuthService.signOut();
      removeStorageObject('userData');
      this.router.navigateByUrl('/login');
    });
  }

  fillUserData(remember?: boolean): Observable<SpaceOwner> {
    const spaceOwnerData = new Subject<SpaceOwner>();
    this.spaceOwnerService.getActualSpaceOwner().subscribe((spaceOwner: SpaceOwner) => {
      setStorageObject(
        'userData',
        Serialize(spaceOwner, () => SpaceOwner),
        remember ? 'local' : 'session'
      );
      spaceOwnerData.next(spaceOwner);
    });

    return spaceOwnerData.asObservable();
  }

  static getSpaceOwnerData(): SpaceOwner | undefined {
    const spaceOwnerData: IJsonObject = getStorageObject('userData');
    if (spaceOwnerData) {
      return Deserialize(spaceOwnerData, () => SpaceOwner);
    } else {
      return undefined;
    }
  }

  loggedIn(): boolean {
    return !!getStorageObject('userData');
  }
}
