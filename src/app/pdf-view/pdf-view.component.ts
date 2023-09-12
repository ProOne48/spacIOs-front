import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Space } from '../../models/space';
import { SpaceService } from '../../services/space.service';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {
  pdfSrc!: ArrayBuffer;
  space!: Space;

  constructor(private spaceService: SpaceService, private routerParams: ActivatedRoute) {}

  ngOnInit(): void {
    this.routerParams.params.subscribe((params) => {
      this.spaceService.getPdf(params['id']).subscribe((data: ArrayBuffer) => {
        this.pdfSrc = data;
      });

      this.spaceService.getSpaceById(params['id']).subscribe((space) => {
        this.space = space;
      });
    });
  }
}
