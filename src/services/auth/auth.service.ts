import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { getStorageObject } from '../../utils/storage-manager';
import { SpaceOwner } from '../../models/space-owner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  fillUserData(): void {
    const dataLoaded = new Subject<SpaceOwner>();
  }

  loggedIn(): boolean {
    return !!getStorageObject('userData');
  }
}
