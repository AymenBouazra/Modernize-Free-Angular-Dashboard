import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from '../../services/business-unit.service';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
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
  businessUnits: any[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];
  length: number = 0;
  totalBusinessUnits: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  currentPage: number = 1;
  disabled = false;
  pageEvent: PageEvent;
  isLoading: boolean = true;
  constructor(private businessUnitService: BusinessUnitService) { }

  ngOnInit(): void {
    this.loadBusinessUnits();
  }

  loadBusinessUnits(page: number = 1, limit: number = 5) {
    this.isLoading = true;
    this.businessUnitService.getBusinessUnits(page, limit).subscribe({
      next: (response: any) => {
        this.businessUnits = response.data;
        this.totalBusinessUnits = response.pagination.total;
      },
      error: (error) => {
        console.error('Error fetching business units:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadBusinessUnits(this.pageIndex + 1, this.pageSize);
  }

  deleteBusinessUnit(id: string) {
    this.businessUnitService.deleteBusinessUnit(id).subscribe({
      next: () => {
        this.loadBusinessUnits();
      },
      error: (error) => {
        console.error('Error deleting business unit:', error);
      }
    });
  }


}
