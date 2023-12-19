import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Space } from '../../../models/space';
import { SpaceService } from '../../../services/space.service';

@Component({
  selector: 'app-space-list',
  templateUrl: './space-list.component.html',
  styleUrls: ['./space-list.component.scss']
})
export class SpaceListComponent implements OnInit {
  spaces?: Space[];

  constructor(private spaceService: SpaceService, private router: Router) {}

  ngOnInit(): void {
    this.spaceService.getSpaces().subscribe((spaces) => {
      this.spaces = spaces.items;
    });
  }

  get dataLoaded(): boolean {
    return !!this.spaces;
  }
}
