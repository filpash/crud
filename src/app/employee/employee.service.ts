import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employees } from "./employees";
import { MessageService } from '../message.service';
import {Departments} from "../department/departments";
import {DEPARTMENTS} from "../department/mock-departments";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeUrl = 'api/employee';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  form: FormGroup = new FormGroup({
    position: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    departmentID: new FormControl(0, Validators.required)
  })


  getEmployees(): Observable<Employees[]> {
    this.messageService.add('EmployeeService: fetched employees');
    return this.http.get<Employees[]>(this.employeeUrl)
      .pipe(
        tap(_ => this.log('fetched employees')),
        catchError(this.handleError<Employees[]>('getEmployees', []))
    )
  };

  getEmployeeNo404<Data>(position: number): Observable<Employees> {
    const url = `${this.employeeUrl}/?position=${position}`;
    return this.http.get<Employees[]>(url)
      .pipe(
        map(employees => employees[0]), // returns a {0|1} element array
        tap(e => {
          const outcome = e ? `fetched` : `did not find`;
          this.log(`${outcome} employee position=${position}`);
        }),
        catchError(this.handleError<Employees>(`getHero id=${position}`))
      );
  }

  getEmployee(position: number): Observable<Employees> {
    const url = `${this.employeeUrl}/${position}`;
    return this.http.get<Employees>(url).pipe(
      tap(_ => this.log(`fetched employees position=${position}`)),
      catchError(this.handleError<Employees>(`getEmployees position=${position}`))
    );
  }

  getDepartments = (): Observable<Departments[]> => {
    this.messageService.add('EmployeeService: fetched departments');
    return of(DEPARTMENTS);
  };

  getDepartment(position: number | string) {
    return this.getDepartments().pipe(
      map((departments: Departments[]) => departments
        .find(department => department.position === +position))
    );
  }

  InitializeFormGrope(){
    this.form.setValue({
      position: null,
      firstName: '',
      lastName: '',
      email: '',
      departmentID: 0
    })
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
