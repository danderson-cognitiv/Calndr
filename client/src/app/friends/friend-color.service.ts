import { Injectable } from '@angular/core';

const colors: string[] = [
  '#ad2121', '#e3bc08', '#34A853', '#FFA500', '#800080', '#008080'
];

@Injectable({
  providedIn: 'root'
})
export class FriendColorService {
  private friendColorMap: Map<string, string> = new Map();

  constructor() {}

  initializeFriendColors(friends: any[]): void {
    friends.forEach((friend, index) => {
      const color = colors[index % colors.length];
      this.friendColorMap.set(friend._id, color);
    });
  }

  getFriendColor(friendId: string): string {
    return this.friendColorMap.get(friendId) || '#1e90ff'; 
  }

  getFriendColorMap(): Map<string, string> {
    return this.friendColorMap;
  }
}
