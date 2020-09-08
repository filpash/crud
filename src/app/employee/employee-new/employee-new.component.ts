import { Component, OnInit } from '@angular/core';
import {DepartmentService} from "../../department/department.service";
import {EmployeeService} from "../employee.service";


@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss']
})
export class EmployeeNewComponent implements OnInit {

  constructor(
    public service: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  onClear() {
    this.service.form.reset();
    this.service.InitializeFormGrope();
  }

}
