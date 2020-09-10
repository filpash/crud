import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Departments} from "./departments";
import { MessageService } from '../message.service';
import {Employees} from "../employee/employees";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private departmentUrl = 'api/departments';
  private employeeUrl = 'api/employees';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    departmentId: new FormControl(0)
  })

  getDepartments(): Observable<Departments[]> {
    this.messageService.add('EmployeeService: fetched departments');
    return this.http.get<Departments[]>(this.departmentUrl)
    .pipe(
      tap(_ => this.log('fetched departments')),
      catchError(this.handleError<Departments[]>('getDepartments', []))
    )
  };

  getEmployees(): Observable<Employees[]> {
    this.messageService.add('EmployeeService: fetched employees');
    return this.http.get<Employees[]>(this.employeeUrl)
      .pipe(
        tap(_ => this.log('fetched employees')),
        catchError(this.handleError<Employees[]>('getEmployees', []))
      )
  };

  /** GET departments from the server */
  getDepartment(id: number): Observable<Departments> {
    const url = `${this.departmentUrl}/${id}`;
    return this.http.get<Departments>(url).pipe(
      tap(_ => this.log(`fetched department id=${id}`)),
      catchError(this.handleError<Departments>(`getDepartment id=${id}`))
    );
  }

  /** POST: add a new department to the server */
  addDepartment(department: Departments): Observable<Departments> {
    return this.http.post<Departments>(this.departmentUrl, department, this.httpOptions).pipe(
      tap((newDepartment: Departments) => this.log(`added department w/ id=${newDepartment.id}`)),
      catchError(this.handleError<Departments>('addDepartment'))
    );
  }

  getEmployee(id: number | string) {
    return this.getEmployees().pipe(
      map((employees: Employees[]) => employees
        .find(employee => employee.id === +id))
    );
  }

  /** DELETE: delete the department from the server */
  deleteDepartment(department: Departments | number): Observable<Departments> {
    const id = typeof department === 'number' ? department : department.id;
    const url = `${this.departmentUrl}/${id}`;

    return this.http.delete<Departments>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted department id=${id}`)),
      catchError(this.handleError<Departments>('deleteDepartment'))
    );
  }

  InitializeFormGrope(){
    this.form.setValue({
      id: null,
      firstName: '',
      departmentId: 0
    })
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`DepartmentService: ${message}`);
  }
}
