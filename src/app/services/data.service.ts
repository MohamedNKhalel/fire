import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Patient } from '../interfaces/patient';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _AngularFirestore:AngularFirestore,private _AuthService:AuthService) { 
  }
  userToken:any =localStorage.getItem('token');
  addPatient(patient:Patient){
    this._AngularFirestore.createId();
    return this._AngularFirestore.collection(`users/${this.userToken}/Patients`).add(patient);
  }

  getAllPatients(){
    this.userToken =localStorage.getItem('token');
    return this._AngularFirestore.collection(`users/${this.userToken}/Patients`).snapshotChanges();
  }
  deletePatient(patient:Patient){
    return this._AngularFirestore.doc(`users/${this.userToken}/Patients/${patient.id}`).delete();
  }

  updatePatient(patient:Patient){
    this.deletePatient(patient);
    this.addPatient(patient);
  }
}
