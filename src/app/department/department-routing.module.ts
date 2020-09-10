import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailComponent } from "./department-detail/department-detail.component";
import {EmployeeDetailComponent} from "../employee/employee-detail/employee-detail.component";
import {DepartmentNewComponent} from "./department-new/department-new.component";

export const departmentRoutes: Routes = [
  {path: '', redirectTo: 'department', pathMatch: 'full'},
  {path: 'department', component: DepartmentListComponent},
  {path: 'department/:id', component: DepartmentDetailComponent},
  {path: 'employee/:id', component: EmployeeDetailComponent},
  {path: 'department-new', component: DepartmentNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(departmentRoutes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
