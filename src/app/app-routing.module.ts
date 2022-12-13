import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';
import { WithdrawComponent } from './withdraw/withdraw.component';

const routes: Routes = [
  // login page
  {
    path:'',component:LoginComponent
  },
  // dashboard
  {
    path:'dashboard',component:DashboardComponent
  },
  // register
  {
    path:'register', component:RegisterComponent
  },
  // deposit
  {
    path:'deposit', component:DepositComponent
  },
  // Withdrawal
  {
    path:'withdraw', component:WithdrawComponent
  },
  // Transaction History
  {
    path:'transaction', component:TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
