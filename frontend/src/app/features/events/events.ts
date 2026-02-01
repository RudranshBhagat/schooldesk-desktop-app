import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events {
   events: any = [];
   selectedEvent:any = {
    title: '',
    date: '',
    description:'',
    shortDescription:''

   }
      constructor(private apiService: Api){}
      ngOnInit(){
        this.getEvents();
        window.scrollTo(0,0);
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
        showEvent(event: any){
          this.selectedEvent = event;
        }
}
