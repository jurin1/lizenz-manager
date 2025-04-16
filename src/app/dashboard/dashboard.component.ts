import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import dummyData from '../../assets/dummy-data.json';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  groups: any[] = [];
  users: any[] = [];
  keys: any[] = [];
  router: any;

  sidebarItems = [
    { image: 'assets/images/group-icon.png', text: 'Gruppen', link: '/gruppen' },
    { image: 'assets/images/user-icon.png', text: 'Benutzer', link: '/benutzer' },
    { image: 'assets/images/key-icon.png', text: 'Keys', link: '/keys' }
  ];
  showFiller: any;

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    const data = dummyData;
    this.groups = data.groups;
    this.users = data.users;
    this.keys = data.keys;
  }




  navigateToGroup(groupId: string): void {
    this.router.navigate([`/gruppen/${groupId}`]);
  }

  navigateToUser(userId: string): void {
    this.router.navigate([`/benutzer/${userId}`]);
  }

  navigateToKey(keyId: string): void {
    this.router.navigate([`/keys/${keyId}`]);
  }


}
