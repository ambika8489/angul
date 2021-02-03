import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EmployeeComponent} from './employee/employee.component';
import {AddEditEmpComponent} from './employee/add-edit-emp/add-edit-emp.component';

const routes: Routes = [
{path:'employee',component:EmployeeComponent},
{path:'addemp',component:AddEditEmpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
