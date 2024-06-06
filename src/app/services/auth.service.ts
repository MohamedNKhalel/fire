import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken:BehaviorSubject<any> = new BehaviorSubject(null);

  saveUserToken(){
    if(localStorage.getItem('token') != null){
      this.userToken.next(localStorage.getItem('token'));
      console.log(this.userToken.getValue());
      
    }
  }
  constructor(private _AngularFireAuth:AngularFireAuth,private _Router:Router) { }
  // login method 
  login(email:string , password:string){
    this._AngularFireAuth.signInWithEmailAndPassword(email,password).then((res)=>{
      if(res.user?.emailVerified == true){
        localStorage.setItem('token',JSON.stringify(res.user?.uid));
        this._Router.navigate(['/dashboard']);
        
      }
      else{
        this._Router.navigate(['verify-email']);
      }
    },err=>{
      alert(err.message);
      this._Router.navigate(['/login'])
    })
  }


  // register method 
  register(email:string , password:string){
    this._AngularFireAuth.createUserWithEmailAndPassword(email,password).then((res)=>{
      alert('success');
      this._Router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    },err=>{
      alert(err.message);
      this._Router.navigate(['/register']);
    })
  }

  // signout method 
  singOut(){
    this._AngularFireAuth.signOut().then(()=>{
      localStorage.removeItem('token');
      this._Router.navigate(['/login']);
    },err=>{
      alert(err.message);
    })
  }

  // forget password method
  forgetPassword(email:string){
    this._AngularFireAuth.sendPasswordResetEmail(email).then((res)=>{
      this._Router.navigate(['/verify-email']);
      
    },err=>{
      alert(err.message)
    })
  } 
  //email Verification
  sendEmailForVerification(user:any){
    //sendEmailVerification => function in the firebase that send email verfication to the email
    user.sendEmailVerification().then((res:any)=>{
      this._Router.navigate(['/verify-email']);
    },(err:any)=>{
      alert(err.message)
    })
  }


  //Google signIn
  signInIwthGoogle(){
    this._AngularFireAuth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
      this._Router.navigate(['/dashboard']);
    },err=>{
      alert(err.message)
    })
  }

  //facebook signin
  signInWithFacebook(){
    this._AngularFireAuth.signInWithPopup(new FacebookAuthProvider).then(res=>{
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
      this._Router.navigate(['/dashboard']);
    },err=>{
      alert(err.message)
    })
  }
}
