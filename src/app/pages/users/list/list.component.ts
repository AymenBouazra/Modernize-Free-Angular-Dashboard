import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatPaginatorModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  isLoading: boolean = true;
  users: any[] = [];
  totalUsers: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  displayedColumns: string[] = ['name', 'email', 'actions'];

  constructor(
    private userService: UserService,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.users = response.data || response;
        this.totalUsers = response.total || response.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to get users', error);
        this.toast.error('Failed to load users');
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

}