import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
   galleries: any = [];
        constructor(private apiService: Api, private sanitizer: DomSanitizer){} 
        ngOnInit(){
          this.getGalleries();
          window.scrollTo(0,0);
        }
        sanitizerUrl(url: string){
          return this.sanitizer.bypassSecurityTrustUrl(url);

        }
         getGalleries(){
            this.apiService.getGallery().subscribe({
              next:(response: any)=>{
                if(response && response['status'] === 'Y'){
                response.data.map((obj:any)=>{
                  obj['images'] = obj.imagesUrl.split(',')
                })
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
