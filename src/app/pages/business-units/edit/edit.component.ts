import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { HotToastService } from '@ngneat/hot-toast';
import { BusinessUnitService } from '../../services/business-unit.service';
@Component({
  selector: 'app-edit',
  imports: [RouterModule, CommonModule, MaterialModule, ReactiveFormsModule, MatError],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  id: string;
  constructor(private router: Router,
    private toast: HotToastService,
    private businessUnitService: BusinessUnitService,
    private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.businessUnitService.getBusinessUnit(this.id).subscribe({
      next: (v: any) => {
        console.log(v);
        this.form.patchValue(v)
      },
      error: (e) => {
        console.log(e);
        this.toast.error(e.message, {
          duration: 5000,
          position: 'bottom-center'
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.businessUnitService.updateBusinessUnit(this.id, this.form.value).subscribe({
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
