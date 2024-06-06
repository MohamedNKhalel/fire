import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService){}
  email:string ='';
  password:string = '';
  errMsg:string ='';

  register(){
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
    this._AuthService.register(this.email,this.password);
    this.email =''
    this.password =''
  }

}
