import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-reset-password',
  imports: [RouterModule, MatError, FormsModule, ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  form = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private toast: HotToastService) { }
  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) {
      this.toast.error('Remplissez tous les champs', {
        duration: 3000,
        position: 'bottom-center',
      });
      return;
    }
    this.authService.resetPassword(this.token, this.form.value).subscribe(
      {
        next: (v) => {
          this.toast.success('Votre mot de passe a été réinitialisé');
          this.router.navigate(['/authentication/login']);
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