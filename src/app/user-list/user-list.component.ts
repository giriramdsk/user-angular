import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  searchTerm: string = '';
  pageSize: number = 10;
  page: number = 1;
  totalPages: number = 1;
  sortField: string = 'firstName';
  sortOrder: string = 'asc';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers(this.page, this.pageSize, this.sortField, this.sortOrder, this.searchTerm).subscribe({
      next: (response: any) => {
        this.users = response.docs; 
        this.totalPages = response.totalPages; 
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }
  

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.loadUsers();
  }
}
