import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { DepartmentService } from "../../../service/department.service";
import { Departments } from "../../../model/content/departments.model";
import {Employees} from "../../../model/content/employees.model";

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

  /** Get department by id*/
  getDepartments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getDepartment(id)
      .subscribe(department => this.departments = department);
  }

  /** Get employee by id*/
  getEmployees() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getEmployee(id)
      .subscribe(employee => this.employees = employee);
  }

  /** Get all employees for btn*/
  getEmployeeDepartment(employee: Employees) {
    const employeePositionDepartment = employee ? employee.id : null;
    this.router.navigate([`/employee/`]);
  }

  /** Delete current department_id*/
  delete(id): void {
    this.service.deleteDepartment(id).subscribe(value => {
      this.router.navigateByUrl('/department')
    });
  }

  /** Redirect to all departments*/
  update():void{
    this.router.navigateByUrl('/department')
  }

}
