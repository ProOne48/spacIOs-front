import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { getStorageObject, removeStorageObject, setStorageObject } from '../../utils/storage-manager';
import { ApiService } from '../api.service';
import { GoogleCredentialsInterface } from '../../definitions/credentials.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../../models/login-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SpaceOwner } from '../../models/space-owner';
import { SpaceOwnerService } from '../space-owner.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router,
    private apiService: ApiService,
    private socialAuthService: SocialAuthService,
    private spaceOwnerService: SpaceOwnerService
  ) {
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
