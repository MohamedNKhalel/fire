import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService:AuthService){}
  errMsg:string ='';
  email:string = '';
  password:string = '';
  ngOnInit(): void {
      
  }
login(){
  if(this.email == ""){
    this.errMsg = "please enter Your Email";
    return;
  }
  if(this.password == ''){
    this.errMsg = 'please enter your password';
    return;
  }
  if(this.email == '' && this.password == ''){
    this.errMsg = 'please enter your email and password'
  }
  else{
    this.errMsg = ''
  }
  this._AuthService.login(this.email,this.password);
  this.email =''
  this.password =''
}
loginWithGoogle(){
  this._AuthService.signInIwthGoogle();
}
loginWithFacebook(){
  this._AuthService.signInWithFacebook();
}
loginWithGithub(){

}
}
