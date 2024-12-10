import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner-mostrar',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './spinner-mostrar.component.html',
  styleUrl: './spinner-mostrar.component.css'
})
export class SpinnerMostrarComponent {
  constructor(private dialogRef: MatDialogRef<SpinnerMostrarComponent>) {}

  cerrarSpinner() {
    this.dialogRef.close();
  }

}
