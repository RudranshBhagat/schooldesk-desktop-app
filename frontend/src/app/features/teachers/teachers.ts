import { Component } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-teachers',
  imports: [],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers {
  teachers: any = [];
  constructor(private apiService: Api) { }
  ngOnInit() {
    this.getTeachers();
    window.scrollTo(0, 0);
  }

  getTeachers() {
    this.apiService.getTeachers().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.teachers = response.data;
          console.log(this.teachers);
        }
      },
      error(error: any) {
        console.log(error);
      },
    });
  }
}
