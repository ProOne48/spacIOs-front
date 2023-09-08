import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../../../services/space.service';
import { Space } from '../../../models/space';
import { Router } from '@angular/router';

@Component({
  selector: 'app-space-list',
  templateUrl: './space-list.component.html',
  styleUrls: ['./space-list.component.scss']
})
export class SpaceListComponent implements OnInit {
  spaces: Space[] = [];

  constructor(private spaceService: SpaceService, private router: Router) {}

  ngOnInit(): void {
    this.spaceService.getSpaces().subscribe((spaces) => {
      this.spaces = spaces.items;
    });
  }
}
