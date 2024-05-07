import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserModel } from "../../../../database/interfaces/IUserModel"

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


}