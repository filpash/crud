import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { DepartmentService } from "../department.service";
import { Departments } from "../departments";
import {Employees} from "../../employee/employees";

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  departments: Departments;
  employees: Employees;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: DepartmentService
  ) { }

  ngOnInit() {
    this.getDepartments();
    this.getEmployees();
  }

  getDepartments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getDepartment(id)
      .subscribe(department => this.departments = department);
  }

  getEmployees() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getEmployee(id)
      .subscribe(employee => this.employees = employee);
  }

  gotoEmployeeDepartment(employee: Employees) {
    const employeePositionDepartment = employee ? employee.id : null;
    this.router.navigate([`/employee/`]);
  }



}
