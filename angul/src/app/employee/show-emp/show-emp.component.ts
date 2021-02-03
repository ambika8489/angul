import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { from } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.scss']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service: SharedService) { }

  EmployeeList = [];

  ModalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;




  //salary 


  //end salary

  //pagination
  p: number = 1;
  //pagination end

  //sorting
  key: string = 'id';
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  //sorting end


  ngOnInit(): void {
    this.refreshEmpList();
  }


  addClick() {
    console.log("emp details", this.emp)
    this.emp = {
      EmployeeId: 0,
      EmployeeName: "",
      Salary: "",

    }
    console.log(this.emp)
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;

  }

  editClick(item) {
    console.log(item);
    this.emp = item;
    console.log(this.emp)
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  EmpSalary = []
  refreshEmpList() {
    this.service.getEmpList()
      .subscribe(data => {
        console.log("show length", data)
        this.EmployeeList = data;

      })
  }
  SalaryLevel = 'Greaterthen';
  salary;
  search(salary) {
    if (this.SalaryLevel == 'Greaterthen') {
      const source = from(this.EmployeeList)
      source.pipe(
        filter(a => a.Salary > salary),
        toArray()
      ).subscribe(res => {
        console.log(res)
        this.EmployeeList = res;
      })
    }
    if (this.SalaryLevel == 'Equal') {
      const source = from(this.EmployeeList)
      source.pipe(
        filter(data => data.Salary == salary),
        toArray()
      ).subscribe(res => {
        console.log(res)
        this.EmployeeList = res;
      })
    }
    if (this.SalaryLevel == 'Lesserthen') {
      const source = from(this.EmployeeList)
      source.pipe(
        filter(data => data.Salary < salary),
        toArray()
      ).subscribe(res => {
        console.log(res)
        this.EmployeeList = res;
      })
    }
  }

  SalaryLevels = [
    'Greaterthen',
    'Equal',
    'Lesserthen'
  ];


  onChangeSalaryLevel(value) {
    this.refreshEmpList();
  }
}

