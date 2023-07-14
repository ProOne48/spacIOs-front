import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from '../../../services/auth/auth.service';
import { GoogleCredentialsInterface } from '../../../definitions/credentials.interface';
import { Router } from '@angular/router';
import { SpaceOwnerService } from '../../../services/space-owner.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user?: SocialUser;
  constructor(
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private spaceOwnerService: SpaceOwnerService
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user != null) {
        const loginData: GoogleCredentialsInterface = {
          email: user.email,
          token: user.idToken,
          name: user.name,
          remember: true
        };
        this.login(loginData);
      }
    });
  }

  login(loginData: GoogleCredentialsInterface): void {
    this.authService.login(loginData).subscribe();
  }

  loginMock(): void {
    this.authService.loginMock();
  }

  protected readonly environment = environment;
}
