import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-teachers-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss'
})
export class TeachersDashboard {
  teachers: any = [];
  selectedTeachers: any = null;
  id:any = '';
  isEdit:boolean = false;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedTeachers = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      designation: ['', Validators.required],
      image: ['', Validators.required],
      bio: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.onLoad();
  }
  onLoad() {
    this.apiService.getTeachers().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.teachers = response.data;
          console.log(this.teachers);
        }
      }, error(error: any) {
        console.log(error);
      },
    });
  }

  onSubmit() {
    console.log(this.selectedTeachers.value);
    if(this.isEdit){
       this.apiService.updateTeachers(this.id,this.selectedTeachers.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedTeachers.reset();
        }
      },
      error(error: any) {
        console.log(error);
      },
    });
    }else{
      this.apiService.addTeachers(this.selectedTeachers.value).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedTeachers.reset();
        }
      },
      error(error: any) {
        console.log(error);
      },
    });
    }
  }

  edit(teacher: any) {
    this.isEdit = true;
    this.selectedTeachers.patchValue({
      name: teacher.name,
      subject: teacher.subject,
      designation: teacher.designation,
      image: teacher.image,
      bio: teacher.bio
    });
    this.id = teacher._id;
  }

  delete(teacher: any) {
    console.log(teacher);
    this.apiService.deleteTeachers(teacher._id).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
        }
      },
      error(error: any) {
        console.log(error);
      },
    });
  }
}
