import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm : FormGroup;
  constructor(private fb: FormBuilder,private authService: Auth, private router: Router){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password:['',Validators.required],
    });
  }
  onLogin(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
            next:(response: any)=>{
              if(response && response['status'] === 'Y'){
                const token = response?.token;
                if(token){
                  localStorage.setItem('token', token);
                  localStorage.setItem('user', JSON.stringify(response?.user)); 
                  this.router.navigate(['/dashboard']);
                }
              }
            },
            error(error:any){
            console.log(error);
          },
          });
        

  }
}
