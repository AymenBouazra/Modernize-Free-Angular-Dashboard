import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { InvitationService } from '../services/invitation.service';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, MatError],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent implements OnInit {
  options = this.settings.getOptions();
  isSubmitting: boolean = false;
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private settings: CoreService,
    private router: Router,
    private inviationService: InvitationService,
    private authService: AuthService,
    private toast: HotToastService
  ) { }
  invitationId: string = "";
  form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.invitationId = this.route.snapshot.params['invitationId'] || '';
    this.inviationService.getInvitation(this.invitationId).subscribe({
      next: (v: any) => {
        this.form.patchValue({
          email: v.email,
        });
        this.toast.success(v.message, {
          duration: 5000,
          position: 'bottom-center'
        })
      },
      error: (e) => {
        console.log(e.status);
        if (e.status === 404) {
          this.toast.error('Cette invitation n\'existe pas', {
            duration: 5000,
            position: 'bottom-center',
          });
          this.errorMessage = 'Cette invitation n\'existe pas';
        } else if (e.status === 400) {
          this.toast.error('Cette invitation a déjà été utilisée', {
            duration: 5000,
            position: 'bottom-center',
          });
          this.errorMessage = 'Cette invitation a déjà été utilisée';
        } else {
          this.toast.error('Invitation invalide, demandez à un administrateur de la réinitialiser', {
            duration: 5000,
            position: 'bottom-center',
          });
          this.errorMessage = 'Invitation invalide, demandez à un administrateur de la réinitialiser';
        }
      },
      complete: () => console.info('complete'),
    });
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    this.isSubmitting = true;

    if (this.form.invalid) {
      console.log(this.form);

      return;
    }
    this.authService.register(this.form.value).subscribe({
      next: (v: any) => {
        this.router.navigate(['/authentication/login']);
      },
      error: (e) => {
        this.isSubmitting = false;
        if (e.status === 409) {
          this.toast.error('Cet email est déjà utilisé', {
            duration: 3000,
            position: 'bottom-center',
          });
        } else {
          console.log(e);
        }
      },
      complete: () => console.info('complete'),
    });
  }
}
