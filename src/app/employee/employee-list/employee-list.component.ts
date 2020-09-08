import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import { Employees } from "../employees";
import { EMPLOYEES } from "../mock-employes";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  employees: Observable<Employees[]>;
  selectedPosition: number
  displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'departmentID'];
  dataSource = new MatTableDataSource<Employees>(EMPLOYEES);

  constructor(
    public service: EmployeeService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.employees = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedPosition = +params.get('position');
        return this.service.getEmployees(params.get("position"));
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }
}
