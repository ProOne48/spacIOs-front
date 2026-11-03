import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '@modules/angular/material.module';
import { GoogleLoginModule } from '@modules/integrations/google-login.module';

@Component({
  selector: 'app-auth-container',
  imports: [GoogleLoginModule, MaterialModule],
  templateUrl: './auth-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./auth-container.component.scss']
})
export class AuthContainerComponent {}
