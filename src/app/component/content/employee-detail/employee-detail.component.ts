import { Component, OnInit } from '@angular/core';
import {Employees} from "../../../model/content/employees.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee.service";
import {Departments} from "../../../model/content/departments.model";
import {DepartmentService} from "../../../service/department.service";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employees: Employees;
  department: Departments;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: EmployeeService,
    public service2: DepartmentService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
  }

  getEmployees(): void {
    const position = +this.route.snapshot.paramMap.get('id');
    this.service.getEmployee(position)
      .subscribe(employee => this.employees = employee);
  }

  getDepartments(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service2.getDepartment(id)
      .subscribe(department => this.department = department);
  }

  delete(id): void{
    this.service.deleteEmployee(id).subscribe(value => {
      this.router.navigateByUrl('/employee')
    })
  }

  update(): void{
    this.router.navigateByUrl('/employee')
  }
}
