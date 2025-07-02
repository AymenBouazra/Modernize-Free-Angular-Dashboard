import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { InvitationService } from '../authentication/services/invitation.service';
import { HotToastService } from '@ngneat/hot-toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitation-form',
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './invitation-form.component.html',
  styleUrl: './invitation-form.component.scss'
})
export class InvitationFormComponent implements OnInit {
  invitationForm: FormGroup;
  isLoading = false;
  isSubmitted = false;
  constructor(private invitationService: InvitationService, private toast: HotToastService) { }
  ngOnInit() {
    this.invitationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.invitationForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.invitationService.invitation(this.invitationForm.value).subscribe({
      next: (response: any) => {
        this.toast.success(response.message);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Invitation failed', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        console.log('Invitation request completed');
      }
    });
  }

}
