import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  galleries: any = [];
      constructor(private apiService: Api){} 
      ngOnInit(){
        this.getGalleries();
      }
       getGalleries(){
          this.apiService.getGallery().subscribe({
            next:(response: any)=>{
              if(response && response['status'] === 'Y'){
              this.galleries = response.data;
              console.log(this.galleries);
              }
            },
            error(error:any){
            console.log(error);
          },
          });
}
}
