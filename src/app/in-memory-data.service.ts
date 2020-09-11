import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Departments} from "./department/departments";
import {Employees} from "./employee/employees";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    let departments = [
      { id: 1, departmentId: 1},
      { id: 2, departmentId: 2},
      { id: 3, departmentId: 3},
      { id: 4, departmentId: 4},
      { id: 5, departmentId: 5},
      { id: 6, departmentId: 6},
      { id: 7, departmentId: 7},
    ];
      let employees = [
        { id: 1, firstName: 'David', lastName: 'Matt', email: 'david@mail.com', departmentId: 1},
        { id: 2, firstName: 'John', lastName: 'Tayson', email: 'john@mail.com', departmentId: 2},
        { id: 3, firstName: 'Jim', lastName: 'Lee', email: 'jik@mail.com', departmentId: 3},
        { id: 4, firstName: 'Dik', lastName: 'Mora', email: 'dik@mail.com', departmentId: 4},
        { id: 5, firstName: 'Natasha', lastName: 'Chan', email: 'natali@mail.com', departmentId: 5},
        { id: 6, firstName: 'Rick', lastName: 'Link', email: 'rick@mail.com', departmentId: 6},
        { id: 7, firstName: 'Din', lastName: 'Godson', email: 'din@mail.com', departmentId: 7},
    ]
    return {departments, employees}
  }

  getId(departments: Departments[]): number {
    return departments.length > 0 ? Math.max(...departments.map(departments => departments.id)) + 1 : 1
  }

  getIdEmployee(employees: Employees[]): number {
    // @ts-ignore
    return employees.length > 0 ? Math.max(...employees.map(employees => employees.id)) + 1 : 1
  }
}
