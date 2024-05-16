import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { FriendSelectionService } from './friend-selection.service';
import { FriendColorService } from './friend-color.service'; 

const colors: string[] = [
  '#ad2121', '#1e90ff', '#e3bc08', '#34A853', '#FFA500', '#800080', '#008080'
];
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: any[] = [];  
  friendColorMap: Map<string, string> = new Map();

  constructor(private router: Router, private proxy$: CalndrProxyService, 
    private friendSelectionService: FriendSelectionService, 
    private friendColorService: FriendColorService
  ) {}

  ngOnInit(): void {
    this.proxy$.getUserByName('DandyAndy77').subscribe({
      next: (result: IUserModel) => {
        console.log(result.friends)
        this.friends = result.friends || [];
        this.friendColorService.initializeFriendColors(this.friends);
      },
      error: (error) => {
        console.error('Failed to load friends:', error);
        this.friends = [];
      }
    });
  }

  initializeFriendColors(): void {
    this.friends.forEach((friend, index) => {
      const color = colors[index % colors.length];
      this.friendColorMap.set(friend._id, color);
    });
  }

  toggleFriendSelection(friend: any) {
    friend.selected = !friend.selected;
    console.log("friend", friend)
    this.friendSelectionService.updateSelectedFriends(
      this.friends.filter(friend => friend.selected)
    );
  }

  getFriendColor(friendId: string): string {
    return this.friendColorService.getFriendColor(friendId);
  }
}
