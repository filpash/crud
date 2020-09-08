import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { DepartmentService } from "../department.service";
import { Departments } from "../departments";
import {DEPARTMENTS} from "../mock-departments";
import {Employees} from "../../employee/employees";
import {EMPLOYEES} from "../../employee/mock-employes";

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  department: Observable<Departments>
  employees: Observable<Employees>
  displayedColumns: string[] = ['position', 'departmentID'];
  displayedItems: string[] = ['position', 'firstName', 'lastName', 'email', 'departmentID'];
  dataSource = DEPARTMENTS;
  dataSource2 = EMPLOYEES;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: DepartmentService,
    public service2: DepartmentService,
    public departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.department = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getDepartment(params.get('position')))
    );
    this.employees = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service2.getEmployee(params.get('position')))
    );
  }

  gotoEmployee(employee: Employees) {
    const employeePosition = employee ? employee.position : null;
    this.router.navigate([`/employee/${employee.position}`]);
  }

  gotoEmployeeDepartment(employee: Employees) {
    const employeePositionDepartment = employee ? employee.position : null;
    this.router.navigate([`/employee/`]);
  }

  removeDepartment(department: Departments): void {
    this.dataSource = this.dataSource.filter(d => d !== department)
  }
}
