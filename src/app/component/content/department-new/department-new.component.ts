import { Component, OnInit } from '@angular/core';
import { DepartmentService } from "../../../service/department.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-department-new',
  templateUrl: './department-new.component.html',
  styleUrls: ['./department-new.component.scss']
})
export class DepartmentNewComponent implements OnInit {
  private id: number = 0;

  form = new FormGroup({
  id: new FormControl(null),
  name: new FormControl('', Validators.required)
});

  constructor(
    public service: DepartmentService,
    private router: Router

  ) { }

  ngOnInit(): void {}

  add(name: string): void {
    let id = 0;
    let allDepartments = this.service
      .getDepartments().subscribe(value => {
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
  }
}
