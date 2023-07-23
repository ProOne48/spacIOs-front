import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Table} from "../../models/table";

@Component({
  selector: 'app-board-info-modal',
  templateUrl: './board-info-modal.component.html',
  styleUrls: ['./board-info-modal.component.scss']
})
export class BoardInfoModalComponent {

  form: FormGroup;
  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Table
  ) {
    this.form = this.builder.group({
      table_number: this.builder.control(this.data?.tableNumber ? this.data.tableNumber : '', [Validators.required]),
      n_chairs: this.builder.control(this.data?.nChairs ? this.data.nChairs : '', [Validators.required]),
      reservable: this.builder.control(this.data?.reservable ? this.data.reservable : '', [Validators.required])
    });
  }

}
