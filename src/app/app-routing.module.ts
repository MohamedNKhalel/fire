import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"" ,redirectTo:'login',pathMatch:'full'},
  {path:"login",loadComponent:()=>import("./components/login/login.component").then((m)=>m.LoginComponent)},
  {path:"register",loadComponent:()=>import("./components/register/register.component").then((m)=>m.RegisterComponent)},
  {path:"forget-password",loadComponent:()=>import("./components/forgot-password/forgot-password.component").then((m)=>m.ForgotPasswordComponent)},
  {path:"verify-email",loadComponent:()=>import("./components/verify-email/verify-email.component").then((m)=>m.VerifyEmailComponent)},
  {path:"dashboard",loadComponent:()=>import('./components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
