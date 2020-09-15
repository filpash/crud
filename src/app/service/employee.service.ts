import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Employees } from "../model/content/employees.model";
import { MessageService } from '../message.service';
import {Departments} from "../model/content/departments.model";
import {DEPARTMENTS} from "../data/mock-departments";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeUrl = 'api/employees';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  /** Get Employees in InMemoryDataService*/
  getEmployees(): Observable<Employees[]> {
    this.messageService.add('EmployeeService: fetched employees');
    return this.http.get<Employees[]>(this.employeeUrl)
      .pipe(
        tap(_ => this.log('fetched employees')),
        catchError(this.handleError<Employees[]>('getEmployees', []))
      )
  };

  /** Get Employee in InMemoryDataService*/
  getEmployee(id: number): Observable<Employees> {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.get<Employees>(url).pipe(
      tap(_ => this.log(`fetched employees id=${id}`)),
      catchError(this.handleError<Employees>(`getEmployees id=${id}`))
    );
  }

  /** Get message if getData in memory can't find data*/
  getEmployeeNo404<Data>(id: number): Observable<Employees> {
    const url = `${this.employeeUrl}/?id=${id}`;
    return this.http.get<Employees[]>(url)
      .pipe(
        map(employees => employees[0]), // returns a {0|1} element array
        tap(e => {
          const outcome = e ? `fetched` : `did not find`;
          this.log(`${outcome} employee id=${id}`);
        }),
        catchError(this.handleError<Employees>(`getEmployee id=${id}`))
      );
  }

  /** POST: add a new department to the server */
  addEmployee(employee:
                {id: number;
                firstName: string;
                lastName: string;
                email: string;
                departmentId: number; }): Observable<Employees> {
    return this.http.post<Employees>(this.employeeUrl, employee, this.httpOptions).pipe(
      tap((newEmployee: Employees) => this.log(`added employee w/ id=${newEmployee.id}`)),
      catchError(this.handleError<Employees>('addEmployee'))
    );
  }

  /** DELETE: delete the employee from the server */
  deleteEmployee(employee: Employees | number): Observable<boolean> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeeUrl}/${id}`;

    return this.http.delete<boolean>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<boolean>('deleteEmployee'))
    );
  }

  getDepartments = (): Observable<Departments[]> => {
    this.messageService.add('EmployeeService: fetched departments');
    return of(DEPARTMENTS);
  };

  getDepartment(id: number | string) {
    return this.getDepartments().pipe(
      map((departments: Departments[]) => departments
        .find(department => department.id === +id))
    );
  }

  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
