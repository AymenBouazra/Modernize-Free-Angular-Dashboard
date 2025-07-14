import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {Router, RouterModule} from "@angular/router";
import {WorkspaceService} from "../../services/workspace.service";
import {HotToastService} from "@ngneat/hot-toast";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list-workspace',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  workspaces: any[] = []
  displayedColumns: string[] = ['name', 'location', 'businessUnit', 'isAvailable', 'isMeetingRoom', 'actions'];
  length: number = 0;
  totalWorkspaces: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  currentPage: number = 1;
  disabled = false;
  pageEvent: PageEvent;
  isLoading: boolean = true;

  constructor(private router: Router, private workspaceService: WorkspaceService, private toast: HotToastService) {
  }

  ngOnInit() {
    this.loadWorkspaces()
  }

  loadWorkspaces(page: number = 1, limit: number = 5) {
    this.workspaceService.getWorkspaces(page, limit).subscribe({
      next: (res: any) => {
        this.workspaces = res.data
        this.totalWorkspaces = res.pagination.total
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadWorkspaces(this.pageIndex + 1, this.pageSize);
  }

  deleteWorkspace(id: string) {
    this.workspaceService.deleteWorkspace(id).subscribe({
      next: () => {
        this.loadWorkspaces();
      },
      error: (error) => {
        console.error('Error deleting business unit:', error);
      }
    });
  }
}
