import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { HotToastService } from '@ngneat/hot-toast';
import { BusinessUnitService } from '../../services/business-unit.service';

@Component({
  selector: 'app-add',
  imports: [RouterModule, CommonModule, MaterialModule, ReactiveFormsModule, MatError],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(private router: Router, private toast: HotToastService, private businessUnitService: BusinessUnitService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void { }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.businessUnitService.createBusinessUnit(this.form.value).subscribe({
      next: (v: any) => {
        console.log(v);
        this.toast.success(v.message, {
          duration: 5000,
          position: 'bottom-center'
        });
        this.router.navigate(['/dashboard/business-units']);
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
        this.isLoading = false;
      }
    });
  }


}
