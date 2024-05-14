import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserModel } from "../../../../database/interfaces/IUserModel"
import { IEventModel } from "../../../../database/interfaces/IEventModel"
import { IMessageModel } from '../../../../database/interfaces/IMessageModel';
import { IUserEventModel } from '../../../../database/interfaces/IUserEventModel';


@Injectable({
  providedIn: 'root'
})
export class CalndrProxyService {

  hostUrl:string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getUserById(userId:string) {
    return this.httpClient.get<IUserModel>( this.hostUrl + 'user/' + userId);
  }

  getUserByName(username:string) {
    return this.httpClient.get<IUserModel>(this.hostUrl + 'user/name/' + username);
  }

  updateUser(userId: string, payload: any) {
    return this.httpClient.put(`${this.hostUrl}user/${userId}`, payload);
  }

  getEventById(eventId:string) {
    return this.httpClient.get<IEventModel>(this.hostUrl + 'event/' + eventId)
  }

  getMessagesByEventId(eventId:string) {
    return this.httpClient.get<IMessageModel[]>(this.hostUrl + 'message/event/' + eventId)
  }

  getUserEventById(userEventId:string) {
    return this.httpClient.get<IUserEventModel>(this.hostUrl + 'user_event/' + userEventId);
  }

  createMessage(payload: any) {
    return this.httpClient.post(this.hostUrl + 'message', payload)
  }

  createEvent(payload: any) {
    return this.httpClient.post(this.hostUrl + 'event', payload)
  }

  getUserEventsByUserId(userId:string) {
    return this.httpClient.get<IUserEventModel[]>(this.hostUrl + 'user_event/user/' + userId);
  }


  getUserEventsByEventId(eventId:string) {
    return this.httpClient.get<IUserEventModel[]>(this.hostUrl + 'user_event/event/' + eventId);
  }

  updateUserEvent(userEvent: string, payload: any) {
    return this.httpClient.put(`${this.hostUrl}user_event/${userEvent}`, payload);
  }

}