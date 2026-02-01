import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-events-dashboard',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './events-dashboard.html',
  styleUrl: './events-dashboard.scss'
})
export class EventsDashboard {
  events: any = [];
  selectedEvent: any = null;
  isEdit: boolean = false;
  id: string | null = null;
  
  constructor(private apiService: Api, private fb: FormBuilder) {
    this.selectedEvent = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: ['']
    });
  }

  ngOnInit() {
    this.onLoad();
    window.scrollTo(0, 0);
  }

  onLoad() {
    this.apiService.getEvents().subscribe({
      next: (response: any) => {
        if (response && response['status'] === 'Y') {
          this.events = response.data;
          console.log(this.events);
        }
      },
      error(error: any) {
        console.log(error);
      },
    });
  }

  edit(event: any) {
    // Extract date and time from the ISO datetime string
    const eventDate = new Date(event.date);
    const dateOnly = eventDate.toISOString().split('T')[0]; // "2025-08-15"
    const timeOnly = eventDate.toTimeString().slice(0, 5); // "08:00"

    this.selectedEvent.patchValue({
      title: event.title,
      date: dateOnly,
      time: timeOnly,
      location: event.location,
      description: event.description,
      shortDescription: event.shortDescription || ''
    });
    
    this.isEdit = true;
    this.id = event._id;
  }

  onSubmit() {
    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('Form Valid:', this.selectedEvent.valid);
    console.log('Form Value:', this.selectedEvent.value);
    console.log('Form Errors:', this.selectedEvent.errors);
    
    // Check each control
    Object.keys(this.selectedEvent.controls).forEach(key => {
      const control = this.selectedEvent.get(key);
      console.log(`${key}:`, control?.value, 'Valid:', control?.valid, 'Errors:', control?.errors);
    });

    // Validate form
    if (this.selectedEvent.invalid) {
      this.selectedEvent.markAllAsTouched();
      alert('Please fill all required fields.');
      return;
    }

    // Get form values
    const formValue = this.selectedEvent.value;

    // Additional safety check
    if (!formValue.title || !formValue.date || !formValue.time || 
        !formValue.location || !formValue.description) {
      console.error('Missing fields:', {
        title: !formValue.title,
        date: !formValue.date,
        time: !formValue.time,
        location: !formValue.location,
        description: !formValue.description
      });
      alert('Please fill all required fields.');
      return;
    }

    // Combine date and time into ISO format
    const combinedDateTime = `${formValue.date}T${formValue.time}:00.000Z`;

    // Prepare payload - match backend exactly
    const payload = {
      title: formValue.title.trim(),
      location: formValue.location.trim(),
      description: formValue.description.trim(),
      shortDescription: formValue.shortDescription?.trim() || formValue.description.substring(0, 100).trim(),
      date: combinedDateTime
    };

    console.log('=== PAYLOAD TO BACKEND ===');
    console.log(JSON.stringify(payload, null, 2));

    if (this.isEdit) {
      // UPDATE existing event
      this.apiService.updateEvents(this.id!, payload).subscribe({
        next: (res: any) => {
          console.log('=== UPDATE SUCCESS RESPONSE ===');
          console.log(res);
          
          if (res && res.status === 'Y') {
            alert(res.message || 'Event updated successfully!');
            this.selectedEvent.reset();
            this.isEdit = false;
            this.id = null;
            this.onLoad();
          } else {
            alert(res.message || 'Failed to update event');
          }
        },
        error: (err: any) => {
          console.error('=== UPDATE ERROR RESPONSE ===');
          console.error('Full error object:', err);
          console.error('Error body:', err.error);
          console.error('Error status:', err.status);
          console.error('Error message:', err.message);
          
          alert(err.error?.error || err.error?.message || 'Something went wrong. Please try again.');
        }
      });
    } else {
      // CREATE new event
      this.apiService.addEvents(payload).subscribe({
        next: (res: any) => {
          console.log('=== API SUCCESS RESPONSE ===');
          console.log(res);
          
          if (res && res.status === 'Y') {
            alert(res.message || 'Event added successfully!');
            this.selectedEvent.reset();
            this.onLoad();
          } else {
            alert(res.message || 'Failed to add event');
          }
        },
        error: (err: any) => {
          console.error('=== API ERROR RESPONSE ===');
          console.error('Full error object:', err);
          console.error('Error body:', err.error);
          console.error('Error status:', err.status);
          console.error('Error message:', err.message);
          
          alert(err.error?.error || err.error?.message || 'Something went wrong. Please try again.');
        }
      });
    }
  }

  // Reset form when opening modal for new event
  openAddModal() {
    this.selectedEvent.reset();
    this.isEdit = false;
    this.id = null;
  }

  deleteEvent(event: any) {
    console.log(event);
    this.apiService.deleteEvent(event._id).subscribe({
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