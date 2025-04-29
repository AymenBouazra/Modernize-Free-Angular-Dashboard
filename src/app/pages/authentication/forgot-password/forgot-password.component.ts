import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, MatError],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
  });
  constructor(private router: Router, private authService: AuthService, private toast: HotToastService) { }


  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) {
      this.toast.error('Remplissez tous les champs', {
        duration: 3000,
        position: 'bottom-center',
      });
      return;
    }
    this.authService.forgotPassword(this.form.value).subscribe(
      {
        next: (v) => {
          this.toast.success('Email de réinitialisation de mot de passe envoyé');
        },
        error: (err) => {
          this.toast.error(err.error.message);
        },
        complete: () => {

        }
      }
    )
  }
}
