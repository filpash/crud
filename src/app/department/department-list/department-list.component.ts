import {Component, OnInit, ViewChild} from '@angular/core';
import {DepartmentService} from "../department.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Departments} from "../departments";
import {switchMap} from "rxjs/operators";
import {DEPARTMENTS} from "../mock-departments";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Employees} from "../../employee/employees";
import {EMPLOYEES} from "../../employee/mock-employes";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  departments: Observable<Departments[]>;
  selectedPosition: number
  displayedColumns: string[] = ['position', 'firstName', 'departmentID'];
  dataSource = new MatTableDataSource<Employees>(EMPLOYEES);

  constructor(
    public service: DepartmentService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.departments = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedPosition = +params.get('position');
        return this.service.getDepartments();
      })
    );

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

}
