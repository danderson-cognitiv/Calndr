import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit {

  eventForm!: FormGroup;

  constructor(private router: Router, private proxy$: CalndrProxyService, private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      eventName: [null, Validators.required],
      eventDescription: [null],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  saveEvent() {
    console.log(1)
    if (this.eventForm.valid) {
      const eventData = {
        name: this.eventForm.get('eventName')?.value,
        description: this.eventForm.get('eventDescription')?.value,
        startDate: this.eventForm.get('startDate')?.value,
        endDate: this.eventForm.get('endDate')?.value
      };

      console.log(eventData)
    }
  }

}


