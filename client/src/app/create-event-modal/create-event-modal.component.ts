import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserModel } from '../../../../database/interfaces/IUserModel'; // Assuming you have a user model

declare var $: any;

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit {
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('createEventModal') createEventModal!: ElementRef;
  
  friends: any[] = []; // Already properly initialized as an empty array.
  user: any;
  eventForm!: FormGroup;
  isFriendsListLoaded: boolean = false;

  constructor(private router: Router, private proxy$: CalndrProxyService, private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      eventName: [null, Validators.required],
      eventDescription: [null],
      location: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      selectedFriends: [[]] // Initialize as an empty array
    });
  }

  ngOnInit(): void {
    this.proxy$.getUserByName('DandyAndy77').subscribe({
      next: (result: IUserModel) => {
        this.friends = result.friends || []; // Ensure 'friends' is always an array
        this.user = result || {}
      },
      error: (error) => {
        console.error('Failed to load friends:', error);
        this.friends = []; // Ensure 'friends' is set to an empty array on error
        this.isFriendsListLoaded = true;
      }
    });
  }

  toggleFriendSelection(id: string): void {
    const selectedFriends = this.eventForm.get('selectedFriends')!;
    const index = selectedFriends.value.indexOf(id);
  
    if (index === -1) {
      selectedFriends.patchValue([...selectedFriends.value, id]);
    } else {
      selectedFriends.patchValue(selectedFriends.value.filter((friendId: string) => friendId !== id));
    }
  }

  getFriendById(friendId: string): any {
    return this.friends.find(friend => friend._id === friendId);
  }

  saveEvent() {
    if (this.eventForm.valid) {
      const eventData = {
        name: this.eventForm.get('eventName')?.value,
        description: this.eventForm.get('eventDescription')?.value,
        startTime: this.eventForm.get('startDate')?.value,
        endTime: this.eventForm.get('endDate')?.value,
        friends: this.eventForm.get('selectedFriends')?.value,
        location: this.eventForm.get('location')?.value,
        createdBy: this.user._id      
      };

      this.proxy$.createEvent(eventData).subscribe({
        complete: () => {
          const modal: HTMLElement = this.createEventModal.nativeElement;
          $(modal).modal('hide');
        },
        error: (error) => {
          console.error('Failed to create event:', error);
        }
      });
    }
  }
}
