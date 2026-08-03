import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';

import { FooterComponent } from '../shared-components/footer/footer.component';
import { NavbarComponent } from '../shared-components/navbar/navbar.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, MaterialModule, NavbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {}
