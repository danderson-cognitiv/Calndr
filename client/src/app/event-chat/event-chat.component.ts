import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IMessageModel } from '../../../../database/interfaces/IMessageModel';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { IUserEventViewModel } from '../../../../database/views/IUserEventViewModel';
import { FormsModule } from '@angular/forms'; 
import { Observable, filter } from 'rxjs';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-profile',
  templateUrl: './event-chat.component.html',
  styleUrls: ['./event-chat.component.css']
})
export class EventChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages!: any[];
  currentUser!: IUserModel;
  userEvent!: IUserEventViewModel;
  messageContent: string = '';
  attendees!: any;
  

  constructor(
    private proxy$: CalndrProxyService, 
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userEventId = params['userEventId'];
      if (userEventId) {
        this.authService.currentUser$.pipe(
          filter((user): user is IUserModel => !!user && !!user._id) // Type guard to ensure user is IUserModel
        ).subscribe({
          next: (user) => {
            this.currentUser = user;
            this.loadUserEvent(userEventId);
          },
          error: (error) => console.error('Failed to load current User:', error)
        });
      } else {
        console.error('Event ID not found in URL');
      }
    });
  }
  
  private loadUserEvent(userEventId: string): void {
    console.log(this.currentUser)
    this.proxy$.getUserEventById(userEventId).subscribe({
      next: (userEvent: IUserEventViewModel) => {
        this.userEvent = userEvent;
        this.loadMessages(this.userEvent.event._id);
      },
      error: (error) => console.error('Failed to load event:', error)
    });
  }

  private loadMessages(eventId: string): void {
    this.proxy$.getMessagesByEventId(eventId).subscribe({
      next: (messages: IMessageModel[]) => {
        this.messages = messages;
        console.log(this.messages)
        this.loadAttendees(this.userEvent.event._id);
      },
      error: (error) => console.error('Failed to load event:', error)
    });
  }


  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage(event?: KeyboardEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.messageContent.trim()) {
      console.error("Cannot send an empty message.");
      return;
    }
  

    this.proxy$.getUserEventsByUserIdAndEventId(this.currentUser._id, this.userEvent.event._id).subscribe({
      next: (result) => {
        let userContextUserEvent = result;
        let sentAt = new Date()
        const payload = {
          content: this.messageContent,
          sentAt: sentAt,
          userEvent: userContextUserEvent._id,
        };
        this.proxy$.createMessage(payload).subscribe({
          next: (result) => {
            console.log('Message posted successfully', result);
            console.log(this.userEvent)
            this.messages.push({ ...result, userEvent: userContextUserEvent, sentAt: sentAt, content: this.messageContent });
            this.messageContent = '';
          },
          error: (error) => {
            console.error('Failed to post message:', error);
          }
        });
      },
      error: (error) => {
        console.error("failed to get current user to post message")
      }
    });
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  private loadAttendees(eventId: string): void {
    this.proxy$.getUserEventsByEventId(eventId).subscribe({
      next: (attendees: IUserEventViewModel[]) => {
        this.attendees = attendees;
        console.log(attendees)
      },
      error: (error) => console.error('Failed to load attendees:', error)
    });
  }

  public toggleRSVP(attendee: any): void {
    // Toggle the RSVP status directly on the attendee object
    attendee.rsvp = !attendee.rsvp;
  
    // Prepare the payload to send to the backend
    let payload = { ...attendee, rsvp: attendee.rsvp };
  
    // Call the backend update method
    this.proxy$.updateUserEvent(attendee._id, payload).subscribe({
      next: (result) => {
        console.log('RSVP status updated successfully', result);
      },
      error: (error) => {
        console.error('Failed to update RSVP status:', error);
        // Revert RSVP on error
        attendee.rsvp = !attendee.rsvp;
      }
    });
  }
  
  

}
