import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-notice-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notice-dashboard.html',
  styleUrl: './notice-dashboard.scss'
})
export class NoticeDashboard {
  notices: any = [];
  selectedNotices: any = null;
  id:any = '';
  isEdit:boolean = false;
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedNotices = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],

    });
  }
  ngOnInit() {
    this.onLoad();
    window.scrollTo(0, 0);
  }
  onLoad() {
    this.apiService.getNotices().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.notices = response.data;
          console.log(this.notices);
        }
      },
      error(error: any) {
        console.log(error);
      },
    });
  }

onSubmit() {
  const payload = {
    ...this.selectedNotices.value,
    date: new Date().toISOString(), // auto date
  };

  console.log(payload);

  if (this.isEdit && this.id) {

    // UPDATE NOTICE
    this.apiService.updateNotices(this.id, payload).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert('Notice updated successfully');
          this.onLoad();
          this.selectedNotices.reset();
          this.isEdit = false;
          this.id = '';
        }
      },
      error(error: any) {
        console.log(error);
      },
    });

  } else {

    // ADD NOTICE
    this.apiService.addNotices(payload).subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          alert(response.message);
          this.onLoad();
          this.selectedNotices.reset();
        }
      },
      error(error: any) {
        console.log(error);
      },
    });

  }
}



  edit(notice: any){
    this.isEdit= true;
    this.selectedNotices.patchValue({
      title: notice.title,
      description: notice.description,
      category: notice.category,
    });
    this.id = notice._id;
  }

  delete(notice: any) {
    console.log(notice);
    this.apiService.deleteNotices(notice._id).subscribe({
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
