import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IMessageModel } from '../../../../database/interfaces/IMessageModel';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { IUserEventModel } from '../../../../database/interfaces/IUserEventModel';
import { FormsModule } from '@angular/forms'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './event-chat.component.html',
  styleUrls: ['./event-chat.component.css']
})
export class EventChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages!: any[];
  currentUserName:string = 'DandyAndy77'; //todo change this to dynamically save the userId. Write down we are going to hardcode to fname of Dave
  currentUser!: IUserModel;
  userEvent!: any;
  messageContent: string = '';
  attendees!: any;
  

  constructor(
    private proxy$: CalndrProxyService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userEventId = params['userEventId'];
      if (userEventId) {
        this.loadUser(this.currentUserName).subscribe({
          next: (user: IUserModel) => {
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
      next: (userEvent: IUserEventModel) => {
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

  private loadUser(username: string): Observable<IUserModel> {
    return this.proxy$.getUserByName(username);
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
  
    let sentAt = new Date()
    const payload = {
      content: this.messageContent,
      sentAt: sentAt,
      userEvent: this.userEvent._id,
    };
  
    this.proxy$.createMessage(payload).subscribe({
      next: (result) => {
        console.log('Message posted successfully', result);
        console.log(this.userEvent)
        this.messages.push({ ...result, userEvent: this.userEvent, sentAt: sentAt, content: this.messageContent });
        this.messageContent = '';
      },
      error: (error) => {
        console.error('Failed to post message:', error);
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
      next: (attendees: IUserEventModel[]) => {
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
