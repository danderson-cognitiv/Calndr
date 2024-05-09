import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IUserModel } from '../../../../database/interfaces/IUserModel';// Assuming you have a user model

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: any[] = [];  // Already properly initialized as an empty array.

  constructor(private router: Router, private proxy$: CalndrProxyService) {}

  ngOnInit(): void {
    this.proxy$.getUserByName('DandyAndy77').subscribe({
      next: (result: IUserModel) => {
        console.log(result.friends)
        this.friends = result.friends || [];  // Ensure 'friends' is always an array
      },
      error: (error) => {
        console.error('Failed to load friends:', error);
        this.friends = [];  // Ensure 'friends' is set to an empty array on error
      }
    });
  }
}

