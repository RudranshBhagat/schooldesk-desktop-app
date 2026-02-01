import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-gallery-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-dashboard.html',
  styleUrl: './gallery-dashboard.scss'
})
export class GalleryDashboard {
  galleries: any = [];
  selectedGallery: any = null;
  id: any = '';
  isEdit: boolean = false;
  gallery: any;
  image: any;
  constructor(private apiService: Api, private sanitizer: DomSanitizer, private fb: FormBuilder) {
    this.selectedGallery = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      imagesUrl: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.onLoad();
    window.scrollTo(0, 0);
  }
  sanitizerUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  onLoad() {
    this.apiService.getGallery().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          response.data.map((obj: any) => {
            obj['images'] = obj.imagesUrl.split(',')
          })
          this.galleries = response.data;
          console.log(this.galleries);
        }
      },
      error(error: any) {
        console.log(error);
      },
    });
  }
  onSubmit() {
    console.log(this.selectedGallery.value);
    if (this.isEdit) {
      this.apiService.updateGallery(this.id, this.selectedGallery.value).subscribe({
        next: (response: any) => {
          if (response && response['status'] === 'Y') {
            alert(response.message);
            this.onLoad();
            this.selectedGallery.reset();
          }
        },
        error(error: any) {
          console.log(error);
        },
      });
    } else {
      this.apiService.addGallery(this.selectedGallery.value).subscribe({
        next: (response: any) => {
          if (response && response['status'] === 'Y') {
            alert(response.message);
            this.onLoad();
            this.selectedGallery.reset();
          }
        },
        error(error: any) {
          console.log(error);
        },
      });
    }
  }
  edit(gallery: any) {
    this.isEdit = true;
    this.selectedGallery.patchValue({
      date: this.formateDateforInput(gallery.date),
      imagesUrl: gallery.imagesUrl,
      title: gallery.title,
    });
    this.id = gallery._id;

  }
  formateDateforInput(date: any) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  delete(gallery: any) {
    console.log(gallery);
    this.apiService.deleteGallery(gallery._id).subscribe({
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
