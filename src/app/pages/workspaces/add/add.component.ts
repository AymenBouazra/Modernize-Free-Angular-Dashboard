import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BusinessUnitService} from "../../services/business-unit.service";
import {Router} from "@angular/router";
import { MaterialModule } from 'src/app/material.module';
import {HotToastService} from "@ngneat/hot-toast";
import {WorkspaceService} from "../../services/workspace.service";

@Component({
  selector: 'app-add-workspace',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit{
  businessUnits: any[] = []
  isLoading: boolean = false
  form!: FormGroup
  constructor(private businessUnitService: BusinessUnitService,private workspaceService: WorkspaceService, private toast: HotToastService, private router: Router) {
  }
  ngOnInit() {
    this.form = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        businessUnit: new FormControl('', [Validators.required]),
        isMeetingRoom: new FormControl('', [Validators.required]),
        isAvailable: new FormControl('', [Validators.required]),
      }
    )
    this.businessUnitService.getBusinessUnits().subscribe(
      {
        next: (res:any)=>{
          this.businessUnits = res.data.map((item:any)=> {
            return {value: item._id, label: item.name}
          })
        },
        error: (error)=> {
          console.log(error)
        }
      }
    )
  }
  submit(){
      if (this.form.invalid) {
        return;
      }
      this.isLoading = true;
      this.workspaceService.createWorkspace(this.form.value).subscribe({
        next: (v: any) => {
          this.toast.success(v.message, {
            duration: 5000,
            position: 'bottom-center'
          });
          this.router.navigate(['/dashboard/workspaces']);
          this.isLoading = false;
        },
        error: (e:any) => {
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
