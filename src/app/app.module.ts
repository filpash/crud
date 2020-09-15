import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { DepartmentListComponent } from './component/content/department-list/department-list.component';
import { DepartmentDetailComponent } from './component/content/department-detail/department-detail.component';
import { DepartmentNewComponent } from './component/content/department-new/department-new.component';
import { DepartmentRoutingModule } from './routes/department-routing.module';
import { EmployeeRoutingModule } from "./routes/employee-routing.module";
import { EmployeeListComponent } from "./component/content/employee-list/employee-list.component";
import { EmployeeNewComponent } from './component/content/employee-new/employee-new.component';
import { EmployeeDetailComponent } from "./component/content/employee-detail/employee-detail.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from "@angular/material/sort";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentListComponent,
    DepartmentDetailComponent,
    DepartmentNewComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeNewComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    AppRoutingModule,
    DepartmentRoutingModule,
    EmployeeRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
