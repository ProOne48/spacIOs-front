import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { getStorageObject, removeStorageObject, setStorageObject } from '../../utils/storage-manager';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SpaceOwner } from '../../models/space-owner';
import { SpaceOwnerService } from '../space-owner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private socialAuthService: SocialAuthService,
    private spaceOwnerService: SpaceOwnerService
  ) {}

  login(): void {

  }

  logout(): void {
    this.socialAuthService.signOut();
    removeStorageObject('userData');
  }

  fillUserData(remember: boolean): void {
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
