import { Component, OnInit } from '@angular/core';
import { DepartmentService } from "../department.service";

@Component({
  selector: 'app-department-new',
  templateUrl: './department-new.component.html',
  styleUrls: ['./department-new.component.scss']
})
export class DepartmentNewComponent implements OnInit {

  constructor(
    public service: DepartmentService
  ) { }

  ngOnInit(): void {
  }

  onClear() {
    this.service.form.reset();
    this.service.InitializeFormGrope();
  }

}
