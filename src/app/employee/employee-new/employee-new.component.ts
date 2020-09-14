import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";
import {DepartmentService} from "../../department/department.service";


@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss']
})
export class EmployeeNewComponent implements OnInit {
  departments = [];

  private id: number = 0;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentService.getDepartments().subscribe(value => {
      this.departments = value;
    });
  }

  ngOnInit(): void {}

  add(firstName: string, lastName: string, email: string, departmentId: string | number): void {
    if (!firstName && !lastName && !email && !departmentId) { return; }
    let id = 0;

    let allEmployees = this.service.getEmployees().subscribe(value => {
      this.id = value.length;
      this.id++;
      let employee = {
        id: this.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        departmentId: departmentId
      };
      this.service.addEmployee(employee)
        .subscribe(employee => {
          this.router.navigateByUrl('/employee')
        });
    });

    this.service.form.reset();
    this.service.InitializeFormGrope();
  }
}
