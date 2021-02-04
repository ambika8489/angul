import { Component, OnInit,Input, OnChanges,SimpleChange,SimpleChanges, DoCheck } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss']
})
export class AddEditEmpComponent implements OnInit , OnChanges, DoCheck {

  constructor(private service:SharedService) { }

  @Input() emp:any;
  EmployeeId:string;
  EmployeeName:string;
  Salary:string;

  EmpList:any=[];

  
  ngOnChanges(changes:SimpleChanges){
    const newchange : SimpleChange = changes.emp;
    console.log("previous valur",newchange.previousValue);
    console.log("current valur",newchange.currentValue);
    console.log("insidee")
  }

  ngOnInit(): void {
    this.loadEmpList();
    console.log("inside oninit")
  }

  ngDoCheck(){
    console.log("do checker checking")
  }

  ngOnDestroy(){
    console.log("ngOnDestroy destroyed")
  }
  loadEmpList(){
    this.service.getAllEmpNames().subscribe((data:any)=>{
      console.log("update",data)
      this.EmpList=data;
      this.EmployeeId=this.emp.EmployeeId;
      console.log("empid",this.EmployeeId)
      this.EmployeeName=this.emp.EmployeeName;
      console.log("emp previous name",this.EmployeeName)

      this.Salary=this.emp.Salary;
    });
  }

  addEmployee(){
    var val = {EmployeeId:this.EmployeeId,
                EmployeeName:this.EmployeeName,
                Salary:this.Salary,
              };

    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val = {EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Salary:this.Salary,
   };
  console.log("updated value",val)
    this.service.updateEmployee(val).subscribe(res=>{
    alert(res.toString());
    });
  }




}

