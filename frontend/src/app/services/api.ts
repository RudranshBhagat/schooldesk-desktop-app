import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) { }
  getNotices() {
    return this.http.get(`${environment.apiUrl}/notice`);
  }
  getEvents(value?: any) {
    return this.http.get(`${environment.apiUrl}/event`);
  }
  getGallery() {
    return this.http.get(`${environment.apiUrl}/gallery`);
  }
  getContacts() {
    return this.http.get(`${environment.apiUrl}/contact`); 
  }
  deleteContact(id:string) {
    return this.http.delete(`${environment.apiUrl}/contact/${id}`);
  }
  deleteGallery(id:string) {
    return this.http.delete(`${environment.apiUrl}/gallery/${id}`);
  }
  deleteEvent(id:string) {
    return this.http.delete(`${environment.apiUrl}/event/${id}`);
  }
  deleteNotices(id:string) {
    return this.http.delete(`${environment.apiUrl}/notice/${id}`);
  }
  deleteTeachers(id:string) {
    return this.http.delete(`${environment.apiUrl}/teacher/${id}`);
  }
  getTeachers() {
    return this.http.get(`${environment.apiUrl}/teacher`);
  }
  submitForm(formData:any){
     return this.http.post(`${environment.apiUrl}/contact`, formData);
  }
  addGallery(formData:any){
     return this.http.post(`${environment.apiUrl}/gallery`, formData);
  }
  addNotices(formData:any){
     return this.http.post(`${environment.apiUrl}/notice`, formData);
  }
  addEvents(formData:any){
     return this.http.post(`${environment.apiUrl}/event`, formData);
  }
  addTeachers(formData:any){
     return this.http.post(`${environment.apiUrl}/teacher`, formData);
  }
  updateGallery(id:string, formData:any){
     return this.http.put(`${environment.apiUrl}/gallery/${id}`, formData);
  }
  updateEvents(id:string, formData:any){
     return this.http.put(`${environment.apiUrl}/event/${id}`, formData);
  }
  updateNotices(id:string, formData:any){
     return this.http.put(`${environment.apiUrl}/notice/${id}`, formData);
  }
  updateTeachers(id:string, formData:any){
     return this.http.put(`${environment.apiUrl}/teacher/${id}`, formData);
  }
  
}
