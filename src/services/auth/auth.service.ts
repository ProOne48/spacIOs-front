import { BehaviorSubject, Observable, map } from 'rxjs';
import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { getStorageObject, removeStorageObject, setStorageObject } from '../../utils/storage-manager';
import { ApiService } from '../api.service';
import { GoogleCredentialsInterface } from '../../definitions/credentials.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { SpaceOwner } from '../../models/space-owner';
import { SpaceOwnerService } from '../space-owner.service';
import { environment } from "../../environments/environment";
import { LoginResponse } from "../../models/login-response";

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
          console.log(data)
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

    return loginOkSubject.asObservable();
  }

  loginMock(): void {
    const token = environment.mockToken;
    const credentials: GoogleCredentialsInterface = {
      email: 'mock@gmail.com',
      name: 'mock',
      token: token,
      remember: true
    }

    this.login(credentials).subscribe((loginOk: boolean) => {
      this.checkLoginAndRedirect(loginOk);
    });


  }

  checkLoginAndRedirect(loginOK: boolean): void {
    if (loginOK) {
      this.router.navigate(['/home']);
    }
  }

  logout(): void {
    this.socialAuthService.signOut();
    removeStorageObject('userData');
  }

  fillUserData(remember?: boolean): void {
    this.spaceOwnerService.getActualSpaceOwner().subscribe((spaceOwner: SpaceOwner) => {
      setStorageObject(
        'userData',
        Serialize(spaceOwner, () => SpaceOwner),
        remember ? 'local' : 'session'
      );
    });
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
