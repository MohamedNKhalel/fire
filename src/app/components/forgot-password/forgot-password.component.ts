import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(private _AuthService:AuthService){}
  email:string ='';
  errMsg:string ='';

  forgetPassword(){
    // if(this.email ==''){
    //   this.errMsg = 'please provide your email';
    // }
    // else{
    //   this.errMsg ='';
    // }
    this._AuthService.forgetPassword(this.email)
    this.email = '';
  }
}
