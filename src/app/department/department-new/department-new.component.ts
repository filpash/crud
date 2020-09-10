import { Component, OnInit } from '@angular/core';
import { DepartmentService } from "../department.service";
import {Departments} from "../departments";

@Component({
  selector: 'app-department-new',
  templateUrl: './department-new.component.html',
  styleUrls: ['./department-new.component.scss']
})
export class DepartmentNewComponent implements OnInit {
  departments: Departments[];

  constructor(
    public service: DepartmentService
  ) { }

  ngOnInit(): void {
  }

  add(firstName: string): void {
    firstName = firstName.trim()
    if (!firstName) { return; }
    this.service.addDepartment({firstName} as Departments)
      .subscribe(department => {
        this.departments.push(department)
      });
    this.service.form.reset();
    this.service.InitializeFormGrope();
  }

}
