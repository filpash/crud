import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employees } from "./employee/employees";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const employees = [
      { position: 1, firstName: 'David', lastName: 'Matt', email: 'david@mail.com', departmentID: 2046},
      { position: 2, firstName: 'John', lastName: 'Tayson', email: 'john@mail.com', departmentID: 2030},
      { position: 3, firstName: 'Jim', lastName: 'Lee', email: 'jik@mail.com', departmentID: 2072},
      { position: 4, firstName: 'Dik', lastName: 'Mora', email: 'dik@mail.com', departmentID: 2015},
      { position: 5, firstName: 'Natasha', lastName: 'Chan', email: 'natali@mail.com', departmentID: 2064},
      { position: 6, firstName: 'Rick', lastName: 'Link', email: 'rick@mail.com', departmentID: 2081},
      { position: 7, firstName: 'Din', lastName: 'Godson', email: 'din@mail.com', departmentID: 2044},
    ]
    return {employees}
  }

  getPosition(employees: Employees[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employees => employees.position)) + 1 : 1
  }
}