import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserModel } from "../../../../database/interfaces/IUserModel";
import { IEventModel } from "../../../../database/interfaces/IEventModel";
import { IMessageModel } from '../../../../database/interfaces/IMessageModel';
import { IUserEventViewModel } from '../../../../database/views/IUserEventViewModel';

@Injectable({
  providedIn: 'root'
})
export class CalndrProxyService {

  hostUrl:string = 'https://calndrteamnoslackerz.azurewebsites.net/';
  
  constructor(private httpClient: HttpClient) { }

  getUserById(userId:string) {
    return this.httpClient.get<IUserModel>(this.hostUrl + 'user/' + userId, { withCredentials: true });
  }

  getCurrentUser() {
    return this.httpClient.get<IUserModel>(this.hostUrl + 'auth/user', { withCredentials: true });
  }

  getUserByName(username:string) {
    return this.httpClient.get<IUserModel>(this.hostUrl + 'user/name/' + username, { withCredentials: true });
  }

  updateUser(userId: string, payload: any) {
    return this.httpClient.put(`${this.hostUrl}user/${userId}`, payload, { withCredentials: true });
  }

  getEventById(eventId:string) {
    return this.httpClient.get<IEventModel>(this.hostUrl + 'event/' + eventId, { withCredentials: true });
  }

  getMessagesByEventId(eventId:string) {
    return this.httpClient.get<IMessageModel[]>(this.hostUrl + 'message/event/' + eventId, { withCredentials: true });
  }

  getUserEventById(userEventId:string) {
    return this.httpClient.get<IUserEventViewModel>(this.hostUrl + 'user_event/' + userEventId, { withCredentials: true });
  }

  createMessage(payload: any) {
    return this.httpClient.post(this.hostUrl + 'message', payload, { withCredentials: true });
  }

  createEvent(payload: any) {
    return this.httpClient.post(this.hostUrl + 'event', payload, { withCredentials: true });
  }

  getUserEventsByUserId(userId:string) {
    return this.httpClient.get<IUserEventViewModel[]>(this.hostUrl + 'user_event/user/' + userId, { withCredentials: true });
  }

  getUserEventsByEventId(eventId:string) {
    return this.httpClient.get<IUserEventViewModel[]>(this.hostUrl + 'user_event/event/' + eventId, { withCredentials: true });
  }

  updateUserEvent(userEvent: string, payload: any) {
    return this.httpClient.put(`${this.hostUrl}user_event/${userEvent}`, payload, { withCredentials: true });
  }

  getUserEventsByUserIds(userIds:string[]) {
    return this.httpClient.get<IUserEventViewModel[]>(this.hostUrl + 'user_event/users/' + userIds.join(','), { withCredentials: true });
  }

  logout() {
    return this.httpClient.post(this.hostUrl + 'auth/logout', {}, { withCredentials: true });
  }

  login() {
    return this.httpClient.get(`${this.hostUrl}auth/google`, { withCredentials: true });
  }
}
