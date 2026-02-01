import { Component, OnInit } from '@angular/core';
import { Api } from '../../../services/api';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-notice',
  imports: [RouterModule],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
})
export class Notice {
  notice = '';
  constructor(private apiService: Api){}
  ngOnInit(){
    this.getNotices();
  }
    getNotices(){
      this.apiService.getNotices().subscribe({
        next:(response: any)=>{
          if(response && response['status'] === 'Y'){
            let noticeArray: any = [];
            response.data.map((obj:any)=>{
              noticeArray.push(obj.title);
            });
            this.notice = noticeArray.join(', ');
            console.log(this.notice);
          }
        },error(error:any){
          console.log(error);
        },
      });
    }

  }

function getNotices() {
  throw new Error('Function not implemented.');
}

