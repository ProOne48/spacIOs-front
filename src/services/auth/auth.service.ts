import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';

class User {}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  fillUserData(): void {
    const dataLoaded = new Subject<User>();
  }
}
