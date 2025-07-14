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
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatPaginatorModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  isLoading: boolean = true;
  users: any[] = [];
  length: number = 0;
  totalUsers: number = 0;
  pageSizeOptions = [5, 10, 25];
  pageSize: number = 5;
  pageIndex: number = 0;
  currentPage: number = 1;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['name', 'email', 'actions'];

  constructor(
    private userService: UserService,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1, limit: number = 5): void {
    this.isLoading = true;
    this.userService.getUsers(page, limit).subscribe({
      next: (response: any) => {
        this.users = response.data || response;
        this.totalUsers = response.pagination.total || response.data.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to get users', error);
        this.toast.error('Failed to load users');
        this.isLoading = false;
      }
    });
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadUsers(this.pageIndex + 1, this.pageSize);
  }
  handleDeleteUser(user: any) {
    Swal.fire({
      title: 'Confirmation',
      text: `Voulez-vous supprimer l'utilisateur ${user.firstname} ${user.lastname} ?`,
      showCancelButton: true,
      confirmButtonColor: '#6990FF',
      cancelButtonColor: '#CCCCCC',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user._id).subscribe({
          next: (response: any) => {
            this.toast.success(response.message);
            this.loadUsers();
          },
          error: (error) => {
            console.error('Failed to delete user', error);
            this.toast.error('Erreur lors de la suppression de l\'utilisateur');
          }
        });
      }
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}