import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Employees} from "../employees";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {switchMap} from "rxjs/operators";
import {EMPLOYEES} from "../mock-employes";
import {Departments} from "../../department/departments";
import {DEPARTMENTS} from "../../department/mock-departments";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employees: Employees
  department: Observable<Departments>
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'departmentID'];
  displayedItems: string[] = ['position', 'departmentID'];
  dataSource = EMPLOYEES;
  dataSource2 = DEPARTMENTS;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: EmployeeService,
    public service2: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getEmployees();

    this.department = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service2.getDepartment(params.get('position')))
    );
  }

  gotoEmployee(employee: Employees) {
    const departmentPosition = employee ? employee.position : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/employee']);
  }

  getEmployees(): void {
    const position = +this.route.snapshot.paramMap.get('position');
    this.service.getEmployee(position)
      .subscribe(employee => this.employees = employee);
  }
}
