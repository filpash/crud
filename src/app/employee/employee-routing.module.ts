import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import {EmployeeNewComponent} from "./employee-new/employee-new.component";

export const employeeRoutes: Routes = [
  {path: '', redirectTo: 'employee', pathMatch: 'full'},
  {path: 'employee', component: EmployeeListComponent},
  {path: 'employee/:id', component: EmployeeDetailComponent},
  {path: 'employee-new', component: EmployeeNewComponent},

];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
