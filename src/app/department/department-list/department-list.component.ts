import {Component, OnInit, ViewChild} from '@angular/core';
import {DepartmentService} from "../department.service";
import {Departments} from "../departments";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  departments: Departments[];

  displayedColumns: string[] = ['id', 'firstName', 'action'];

  constructor(
    public service: DepartmentService
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.service.getDepartments()
      .subscribe(departments => this.departments = departments)
  }

  delete(department: Departments): void {
    this.departments = this.departments.filter(d => d !== department);
    this.service.deleteDepartment(department).subscribe();
  }

}
