import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [GoogleSigninButtonModule],
  exports: [GoogleSigninButtonModule]
})
export class GoogleLoginModule {}
