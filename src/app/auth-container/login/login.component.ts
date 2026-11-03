import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '@modules/angular/material.module';
import { GoogleLoginModule } from '@modules/integrations/google-login.module';

import { GoogleCredentialsInterface } from '../../../definitions/credentials.interface';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { fadeInAnimation, slideInUpwardsAnimation } from '../../../utils/animations';

@Component({
  selector: 'app-login',
  imports: [GoogleLoginModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, slideInUpwardsAnimation]
})
export class LoginComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private socialAuthService: SocialAuthService = inject(SocialAuthService);

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
