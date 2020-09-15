import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {Router} from "@angular/router";
import {DepartmentService} from "../../../service/department.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-employee-new',
  templateUrl: './employee-new.component.html',
  styleUrls: ['./employee-new.component.scss']
})
export class EmployeeNewComponent implements OnInit {
  departments = [];

  private id: number = 0;

  form = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    departmentId: new FormControl(0)
});

  constructor(
    private router: Router,
    public employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    this.departmentService.getDepartments().subscribe(value => {
      this.departments = value;
    });
  }

  ngOnInit():void {}

  add(firstName: string, lastName: string, email: string, departmentId: number): void {
    let id = 0;
    let allEmployees = this.employeeService.getEmployees().subscribe(value => {
      this.id = value.length;
      this.id++;
      let employee = {
        id: this.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        departmentId: departmentId
      };
      this.employeeService.addEmployee(employee)
        .subscribe(employee => {
          this.router.navigateByUrl('/employee')
        });
    });
  }
}


