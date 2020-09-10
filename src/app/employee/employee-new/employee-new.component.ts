import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employees} from "../employees";


@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss']
})
export class EmployeeNewComponent implements OnInit {
  employees: Employees[];

  constructor(
    public service: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  add(firstName: string, lastName: string, email: string, departmentId: string | number): void {
    if (!firstName && !lastName && !email && !departmentId) { return; }
    this.service.addEmployee({firstName, lastName, email, departmentId} as Employees)
      .subscribe(employee => {
        this.employees.push(employee)
      });
    this.service.form.reset();
    this.service.InitializeFormGrope();
  }
}
