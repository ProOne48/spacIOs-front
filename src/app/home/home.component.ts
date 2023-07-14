import { AuthService } from '../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user = AuthService.getSpaceOwnerData();

  constructor(private authService: AuthService, private router: Router) {}
}
