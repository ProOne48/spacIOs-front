import { Component } from '@angular/core';
import { MaterialModule } from '@modules/angular/material.module';

@Component({
  selector: 'app-footer',
  imports: [MaterialModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}
