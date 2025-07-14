import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from '../../services/user.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-update-user',
  imports: [RouterModule, CommonModule, MaterialModule, ReactiveFormsModule, MatError],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  idUser: string;
  constructor(private userService: UserService, private router: Router, private toast: HotToastService, private route: ActivatedRoute) {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      profile: new FormControl(''),
      businessUnit: new FormControl('', [Validators.required]),
      workLocation: new FormControl('', [Validators.required]),
      defaultDays: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      password: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['id'];
    this.userService.getUser(this.idUser).subscribe(user => {
      this.form.patchValue(user);
    });
    this.form.get('role')?.valueChanges.subscribe(role => {
      if (role === 'Manager') {
        this.form.get('profile')?.setValidators([Validators.required]);
      } else {
        this.form.get('profile')?.clearValidators();
      }
      this.form.get('profile')?.updateValueAndValidity();
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.updateUser(this.idUser, this.form.value).subscribe({
      next: (v: any) => {
        console.log(v);
        this.toast.success(v.message, {
          duration: 5000,
          position: 'bottom-center'
        });
        this.router.navigate(['/dashboard/users']);
        this.isLoading = false;
      },
      error: (e) => {
        console.log(e);
        this.toast.error(e.message, {
          duration: 5000,
          position: 'bottom-center'
        });
        this.isLoading = false;
      },
      complete: () => {
        console.log('User created successfully');
        this.isLoading = false;
      }
    });
  }
}
