import { Component, OnInit } from "@angular/core";
import { Space } from "../../models/space";
import { Router } from "@angular/router";
import { SpaceService } from "../../services/space.service";

@Component({
  selector: 'app-spaces-table',
  templateUrl: './spaces-table.component.html',
  styleUrls: ['./spaces-table.component.scss']
})
export class SpacesTableComponent implements OnInit {
  spaces: Space[] = [];
  displayedColumns: string[] = ['name', 'capacity']

  constructor(
    private spaceService: SpaceService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.spaceService.getActualSpaces().subscribe((spaces) => {
      if(spaces.items)
        this.spaces = spaces.items
      else
        this.spaces = []
    })
  }

  addSpace(){

  }
}
