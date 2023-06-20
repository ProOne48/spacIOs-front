import { Component, OnInit } from "@angular/core";
import { SpaceOwnerService } from "../../services/space-owner.service";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleCredentialsInterface } from "../../definitions/credentials.interface";

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
        this.user = user;
        this.login()
      }
    }
  }

  login(): void {
    const loginData: GoogleCredentialsInterface = {
      email: this.user?.email,
      token: this.user?.idToken,
      name: this.user?.name,
    }
    this.authService.login();
    this.router.navigate(['/']);
  }
}
