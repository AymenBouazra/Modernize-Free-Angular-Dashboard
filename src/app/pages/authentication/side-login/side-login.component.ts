import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../user.interfaces';
import { HotToastService } from '@ngneat/hot-toast';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, MatError],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  userExists: boolean = false;
  userHavePassword: boolean = false;
  user: User;

  constructor(private router: Router, private authService: AuthService, private toast: HotToastService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  get f() {
    return this.form.controls;
  }

  checkUserExists() {
    if (this.form.invalid) {
      this.toast.error('Remplissez tous les champs', {
        duration: 3000,
        position: 'bottom-center',
      });
      return;
    }


    this.authService.checkEmail(this.form.value).subscribe({
      next: (v: any) => {
        this.user = v;
        if (v.email) {
          this.userExists = true;
        }
        if (v.password) {
          this.userHavePassword = true;
        }
      },
      error: (e) => {
        if (e.status === 404) {
          this.toast.error('Cet utilisateur n\'existe pas', {
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
  submit() {
    if (this.form.invalid) {
      this.toast.error('Remplissez tous les champs', {
        duration: 3000,
        position: 'bottom-center',
      });
      return;
    }
    console.log(this.form.errors);
    // If the user exists, validate the password and then login
    if (this.userHavePassword && this.f.password.valid) {
      this.f.password.addValidators([Validators.minLength(6), Validators.required]);
      this.authService.login(this.form.value).subscribe({
        next: (v: any) => {
          this.router.navigate(['/'])
          localStorage.setItem('token', v.token);
          this.toast.success('Connexion réussie')

        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    } else if (!this.userHavePassword && this.f.password.valid && this.f.confirmPassword.valid) {
      // If the user doesn't have a password, validate both password and confirmPassword
      this.f.password.addValidators([Validators.minLength(6), Validators.required]);
      this.f.confirmPassword.addValidators([Validators.minLength(6), Validators.required]);
      if (this.f.password.value === this.f.confirmPassword.value) {
        this.authService.updateAndLogin(this.user._id, this.form.value).subscribe({
          next: (v: any) => {
            this.router.navigate(['/']);
            localStorage.setItem('token', v.token);
            this.toast.success('Connexion réussie')
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
      } else {
        this.toast.error('Les mots de passe ne correspondent pas', {
          duration: 3000,
          position: 'bottom-center',
        });
      }
    }
  }
}