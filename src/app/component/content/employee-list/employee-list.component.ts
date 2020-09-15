import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../../service/employee.service";
import {MatPaginator} from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Employees } from "../../../model/content/employees.model";
import {Departments} from "../../../model/content/departments.model";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  employees: Employees[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'departmentId'];

  constructor(public service: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.service.getEmployees().subscribe(employees => this.employees = employees)
  }

  delete(employee: Employees): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.service.deleteEmployee(employee).subscribe();
  }

}
