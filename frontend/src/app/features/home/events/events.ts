import { Component } from '@angular/core';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events {
   events: any = [];
    constructor(private apiService: Api){}
    ngOnInit(){
      this.getEvents();
    }
      getEvents(){
        this.apiService.getEvents().subscribe({
          next:(response: any)=>{
            if(response && response['status'] === 'Y'){
            this.events = response.data;
            console.log(this.events);
            }
          },
          error(error:any){
          console.log(error);
        },
        });
      }
}
