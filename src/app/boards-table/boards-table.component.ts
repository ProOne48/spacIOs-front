import {Component, Input} from '@angular/core';
import {Table} from "../../models/table";

@Component({
  selector: 'app-boards-table',
  templateUrl: './boards-table.component.html',
  styleUrls: ['./boards-table.component.scss']
})
export class BoardsTableComponent {

  @Input() boards?: Table[] = [];
  @Input() deleteFunction: Function = () => {};

  @Input() editFunction: Function = () => {};
  displayedColumns: string[] = ['name', 'n_chairs', 'actions'];


}
