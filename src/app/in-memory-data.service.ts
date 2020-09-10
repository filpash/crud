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
      { id: 1, firstName: 'David'},
      { id: 2, firstName: 'John'},
      { id: 3, firstName: 'Jim'},
      { id: 4, firstName: 'Dik'},
      { id: 5, firstName: 'Natasha'},
      { id: 6, firstName: 'Rick'},
      { id: 7, firstName: 'Din'},
    ];
      let employees = [
        { id: 1, firstName: 'David', lastName: 'Matt', email: 'david@mail.com', departmentId: 1},
        { id: 2, firstName: 'John', lastName: 'Tayson', email: 'john@mail.com', departmentId: 2},
        { id: 3, firstName: 'Jim', lastName: 'Lee', email: 'jik@mail.com', departmentId: 2},
        { id: 4, firstName: 'Dik', lastName: 'Mora', email: 'dik@mail.com', departmentId: 3},
        { id: 5, firstName: 'Natasha', lastName: 'Chan', email: 'natali@mail.com', departmentId: 3},
        { id: 6, firstName: 'Rick', lastName: 'Link', email: 'rick@mail.com', departmentId: 4},
        { id: 7, firstName: 'Din', lastName: 'Godson', email: 'din@mail.com', departmentId: 6},
    ]
    return {departments, employees}
  }

  getId(departments: Departments[]): number {
    return departments.length > 0 ? Math.max(...departments.map(departments => departments.id)) + 1 : 1
  }

  getIdEmployee(employees: Employees[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employees => employees.id)) + 1 : 1
  }
}
