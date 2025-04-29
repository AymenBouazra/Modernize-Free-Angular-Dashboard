import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  imports: [MatButtonModule, MatCardModule, MatDialogModule],
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppModalComponent {
  readonly dialog = inject(MatDialog);

  openDialog(type:string ,enterAnimationDuration: string, exitAnimationDuration: string,data:any): void {
    if(type === 'confirmation'){
      this.dialog.open(DialogAnimationsExampleDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    if(type === 'description'){
      this.dialog.open(DialogDescriptionExampleDialog, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }
}

@Component({
  templateUrl: 'dialog-example.component.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
}

@Component({
  templateUrl: 'dialog-description-example.component.html',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDescriptionExampleDialog {}
