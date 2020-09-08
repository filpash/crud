import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeNewComponent } from './employee-new/employee-new.component';
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeNewComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ]
})
export class EmployeeModule { }
