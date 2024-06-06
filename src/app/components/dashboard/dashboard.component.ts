import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DataService } from 'src/app/services/data.service';
import { Patient } from 'src/app/interfaces/patient';
import {MatSelectModule} from '@angular/material/select';
import { GeminiService } from 'src/app/services/gemini.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface Gender {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink,MatFormFieldModule, MatInputModule, ReactiveFormsModule,FormsModule,MatSelectModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[GeminiService]
})
export class DashboardComponent implements OnInit {
  constructor(private _AuthService:AuthService,private _DataService:DataService,private _GeminiService:GeminiService){}
  ngOnInit(): void {
    this.getAllPatients();
    this._AuthService.saveUserToken();
}
  patientList :Patient[] =[];
  genders: Gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
  ];
  generatedText:string =''
  prompt:string=''
  loading:boolean = false;
  
  signOut(){
    this._AuthService.singOut();
  }


  createPatientForm:FormGroup= new FormGroup({
    id:new FormControl(''),
    firstName:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    lastName:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    gender:new FormControl(null,[Validators.required]),
    birthDate:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  })

  getAllPatients(){
    this._DataService.getAllPatients().subscribe({
      next:res=>{
        console.log(res);
        
        this.patientList = res.map((e:any)=>{
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
        console.log(this.patientList);
        
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  addPatient(){
    this._DataService.addPatient(this.createPatientForm.value);
  }

  deletePatient(patient:Patient){
    if(confirm(`are you sure you want to delete ${patient.firstName} ${patient.lastName} ?`)){
      this._DataService.deletePatient(patient);
    }
  }

  callGemini(){
    // const prompt = 'write hi'
    // this._GeminiService.generateContent(prompt).subscribe({
    //   next:data=>{
    //     console.log(data);
        
    //   },
    //   error:err=>{
    //     console.log(err);
        
    //   }
    // })
  }
  generateContent() {
    this.loading = true;
    this._GeminiService.generateContent(this.prompt).subscribe({
      next: (response) => {
        this.loading =false;
        const text = response.candidates[0].content.parts[0].text; // Adjust as necessary
        this.generatedText = this.styleContent(text)
        console.log(this.generatedText);

        this.prompt= ''
      },
      error: (error) => {
        this.loading =false;
        console.error('Error generating content:', error);
      }
    });
  }
  styleContent(content: string): string {
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold text
    content = content.replace(/(?:^|\n)\*\s/g, '<li>').replace(/\n\s*\*\s/g, '</li><li>'); // List items
    content = content.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>'); // Wrap list items in <ul>
    content = content.replace(/<\/li>\n/g, '</li>'); // Close list items
    content = content.replace(/(?:^|\n)(\*\*.*?\*\*)/g, '<h2>$1</h2>'); // Headings
    content = content.replace(/\n/g, '<p>'); // Paragraphs
    content = content.replace(/<p><\/li>/g, '</li>'); // Fix list item closing tags
    content = content.replace(/<\/ul><p>/g, '</ul>'); // Remove paragraph tags immediately after lists
    return content;
  }
  toggleChat(){
    
  }
}
