import { Component, OnInit } from '@angular/core';
import {Employees} from "../employees";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {Departments} from "../../department/departments";

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
    public service: EmployeeService
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
    this.service.getDepartment(id)
      .subscribe(department => this.department = department);
  }
}
