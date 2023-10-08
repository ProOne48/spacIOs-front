import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Space } from '../../../models/space';
import { SpaceService } from '../../../services/space.service';

@Component({
  selector: 'app-space-reduced-info',
  templateUrl: './space-reduced-info.component.html',
  styleUrls: ['./space-reduced-info.component.scss']
})
export class SpaceReducedInfoComponent implements OnInit {
  // TODO: Add reserving functionality and  basic info about space
  space!: Space;

  constructor(private spaceService: SpaceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.spaceService.getSpaceById(params['id']).subscribe((space) => {
        this.space = space;
      });
    });
  }
}
