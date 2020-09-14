import { Component, OnInit } from '@angular/core';
import { DepartmentService } from "../department.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department-new',
  templateUrl: './department-new.component.html',
  styleUrls: ['./department-new.component.scss']
})
export class DepartmentNewComponent implements OnInit {
  private id: number = 0;

  constructor(
    private service: DepartmentService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  add(name: string): void {
    if (!name) { return; }
    let id = 0;

    let allDepartments = this.service.getDepartments().subscribe(value => {
      this.id = value.length;
      this.id++;
      let department = {
        id: this.id,
        name: name
      };
      this.service.addDepartment(department)
        .subscribe(department => {
          this.router.navigateByUrl('/department')
        });
    });


    this.service.form.reset();
    this.service.InitializeFormGrope();
  }

}
