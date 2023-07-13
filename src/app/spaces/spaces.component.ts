import { Component } from '@angular/core';
import { SpaceService } from "../../services/space.service";

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss']
})
export class SpacesComponent {

  constructor(
    private spaceService: SpaceService,
  ) {
  }

  addSpace(){

  }
}
