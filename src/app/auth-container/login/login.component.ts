import { Component, OnInit } from "@angular/core";
import { SpaceOwnerService } from "../../../services/space-owner.service";
import { AuthService } from "../../../services/auth/auth.service";
import { Router } from "@angular/router";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleCredentialsInterface } from "../../../definitions/credentials.interface";

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
  ) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if(user != null) {
        const loginData: GoogleCredentialsInterface = {
          email: user.email,
          token: user.idToken,
          name: user.name,
          remember: true
        }
        this.login(loginData)
      }
    });
  }

  login(loginData: GoogleCredentialsInterface): void {

    this.authService.login(loginData).subscribe(
      (loginOk: boolean) => {
        this.authService.checkLoginAndRedirect(loginOk)
      }
    )

  }

  loginMock(): void {
    this.authService.loginMock()
    this.authService.checkLoginAndRedirect(true)
  }
}
