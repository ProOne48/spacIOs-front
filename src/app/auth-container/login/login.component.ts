import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@modules/angular/material.module';
import { GoogleLoginModule } from '@modules/integrations/google-login.module';

import { GoogleCredentialsInterface } from '../../../definitions/credentials.interface';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { fadeInAnimation, slideInUpwardsAnimation } from '../../../utils/animations';

@Component({
  selector: 'app-login',
  imports: [GoogleLoginModule, MaterialModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInAnimation, slideInUpwardsAnimation]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private socialAuthService: SocialAuthService) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user != null) {
        console.log(user);
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
