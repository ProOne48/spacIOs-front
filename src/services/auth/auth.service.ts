import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { getStorageObject, removeStorageObject, setStorageObject } from '../../utils/storage-manager';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SpaceOwner } from '../../models/space-owner';
import { SpaceOwnerService } from '../space-owner.service';
import { GoogleCredentialsInterface } from "../../definitions/credentials.interface";
import { ApiService } from "../api.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router,
    private apiService: ApiService,
    private socialAuthService: SocialAuthService,
    private spaceOwnerService: SpaceOwnerService
  ) {}

  login(loginData: GoogleCredentialsInterface): Observable<boolean> {
    let loginOkSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    this.http.post(this.apiService.getApiUrl() + '/user/login-google', loginData)
      .pipe(map((response: any) => Deserialize(response, () => SpaceOwner)))
      .subscribe(
        (data: any) => {

          if(data.loginOk){
            loginOkSubject.next(true);
            this.fillUserData(loginData.remember);
          }
        },
        (error: any) => {
          this.snackbar.open(error.error.message, '', {
            duration: 5000
          });
        }
      )

    return loginOkSubject.asObservable();
  }

  loginMock(): void {
    let spaceOwnerMock: SpaceOwner = new SpaceOwner();
    spaceOwnerMock.id = 1;
    spaceOwnerMock.name = 'Mock';

    setStorageObject('userData', Serialize(spaceOwnerMock, () => SpaceOwner), 'local');

  }

  checkLoginAndRedirect(loginOK: boolean): void {
    if(loginOK){
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
