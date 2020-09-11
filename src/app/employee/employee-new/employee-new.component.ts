import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss']
})
export class EmployeeNewComponent implements OnInit {
  departments = [
    { id: 1, departmentId: 1},
    { id: 2, departmentId: 2},
    { id: 3, departmentId: 3},
    { id: 4, departmentId: 4},
    { id: 5, departmentId: 5},
    { id: 6, departmentId: 6},
    { id: 7, departmentId: 7},
  ];

  private id: number = 0;

  constructor(
    public service: EmployeeService,
    public router: Router
  ) { }

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
