import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { AuthService } from '../AuthService';
import { filter, switchMap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.css']
})
export class CreateEventModalComponent implements OnInit {
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('createEventModal') createEventModal!: ElementRef;
  
  friends: any[] = [];
  user: any;
  eventForm!: FormGroup;
  isFriendsListLoaded: boolean = false;

  constructor(
    private router: Router,
    private proxy$: CalndrProxyService,
    private formBuilder: FormBuilder,
    private authService: AuthService // Inject AuthService
  ) {
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
    this.authService.currentUser$.pipe(
      filter((user): user is IUserModel => !!user && !!user._id)
      ).subscribe({
      next: (result: IUserModel) => {
        this.user = result || {};
        this.friends = result.friends || [];
        this.isFriendsListLoaded = true;
      },
      error: (error) => {
        console.error('Failed to load user:', error);
        this.friends = [];
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
          this.onSave.emit();
        },
        error: (error) => {
          console.error('Failed to create event:', error);
        }
      });
    }
  }
}
