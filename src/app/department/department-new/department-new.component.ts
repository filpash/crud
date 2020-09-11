import { Component, OnInit } from '@angular/core';
import { DepartmentService } from "../department.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department-new',
  templateUrl: './department-new.component.html',
  styleUrls: ['./department-new.component.scss']
})
export class DepartmentNewComponent implements OnInit {
  private id: number = 0;

  departments = [
    { id: 1, departmentId: 1},
    { id: 2, departmentId: 2},
    { id: 3, departmentId: 3},
    { id: 4, departmentId: 4},
    { id: 5, departmentId: 5},
    { id: 6, departmentId: 6},
    { id: 7, departmentId: 7},
  ];

  constructor(
    public service: DepartmentService,
    public router: Router

  ) { }

  ngOnInit(): void {
  }

  add(departmentId: number | string): void {
    if (!departmentId) { return; }
    let id = 0;

    let allDepartments = this.service.getDepartments().subscribe(value => {
      this.id = value.length;
      this.id++;
      let department = {
        id: this.id,
        departmentId: departmentId
      };
      this.service.addDepartment(department)
        .subscribe(department => {
          this.router.navigateByUrl('/department')
        });
    });


    this.service.form.reset();
    this.service.InitializeFormGrope();
  }

}
