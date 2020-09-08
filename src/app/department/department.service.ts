import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DEPARTMENTS } from './mock-departments';
import { MessageService } from '../message.service';
import {Employees} from "../employee/employees";
import {EMPLOYEES} from "../employee/mock-employes";
import { FormGroup, FormControl, Validators } from "@angular/forms";

export interface Departments {
  position: number,
  firstName: string,
  departmentID: number
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  public DEPARTMENTS: Departments[] = [
    { position: 1, firstName: 'David', departmentID: 2046},
    { position: 2, firstName: 'John', departmentID: 2030},
    { position: 3, firstName: 'Jim', departmentID: 2072},
    { position: 4, firstName: 'Dik', departmentID: 2015},
    { position: 5, firstName: 'Natasha', departmentID: 2064},
    { position: 6, firstName: 'Rick', departmentID: 2081},
    { position: 7, firstName: 'Din', departmentID: 2044},
  ];

  constructor(private messageService: MessageService) { }

  form: FormGroup = new FormGroup({
    position: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    departmentID: new FormControl(0, Validators.required)
  })

  getDepartments = (): Observable<Departments[]> => {
    this.messageService.add('EmployeeService: fetched departments');
    return of(DEPARTMENTS);
  };

  getEmployees = (): Observable<Employees[]> => {
    this.messageService.add('EmployeeService: fetched employees');
    return of(EMPLOYEES);
  };

  getDepartment(position: number | string) {
    return this.getDepartments().pipe(
      map((departments: Departments[]) => departments
        .find(department => department.position === +position))
    );
  }

  getEmployee(position: number | string) {
    return this.getEmployees().pipe(
      map((employees: Employees[]) => employees
        .find(employee => employee.position === +position))
    );
  }

  removeDepartments(position: number) {
    this.DEPARTMENTS.filter(d => d.position !== position)
  }

  InitializeFormGrope(){
    this.form.setValue({
      position: null,
      firstName: '',
      departmentID: 0
    })
  }
}
