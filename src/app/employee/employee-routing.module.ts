import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import {EmployeeNewComponent} from "./employee-new/employee-new.component";

const employeeRoutes: Routes = [
  {path: 'employee', component: EmployeeListComponent},
  {path: 'employee/:position', component: EmployeeDetailComponent},
  {path: 'employee-new', component: EmployeeNewComponent},

];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
