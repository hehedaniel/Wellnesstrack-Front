import { Component, inject } from '@angular/core';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { PesoService } from '../../../services/peso.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-form-anadir-peso',
   standalone: true,
   imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatInputModule,
      MatInputModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FloatLabelModule,
      FormsModule,
      ImageModule,
      InputNumberModule,
      FloatLabelModule,
      FormsModule,
      ImageModule,
      InputNumberModule,
      AutoCompleteModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatFormField,
      MatInput,
      MatButton,
   ],
   providers: [provideNativeDateAdapter()],
   templateUrl: './form-anadir-peso.component.html',
   styleUrl: './form-anadir-peso.component.css',
})
export class FormAnadirPesoComponent {
   #dialog: MatDialog = inject(MatDialog);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   #pesoService: PesoService = inject(PesoService);

   peso: number = 0;

   hora: string = '';
   fecha: string = '';
   idUsuario: string = '';

   ngOnInit() {
      this.hora = new Date().toISOString().split('T')[1].split('.')[0];
      this.fecha = new Date().toISOString().split('T')[0];
      this.obtenerUsuario();
   }

   anadirPeso() {
      if (this.peso > 1 && this.peso != undefined) {
         this.#pesoService.postAnadirPeso(this.idUsuario, this.fecha, this.hora, this.peso).subscribe((data: any) => {
            if (data.code === 201) {
               this.closeDialog();
               location.reload();
            }
         });
      } else {
         this.#snackBar.open('Por favor, rellene el campo correctamente', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      }
   }

   closeDialog() {
      this.#dialog.closeAll();
   }

   obtenerUsuario() {
      this.idUsuario = localStorage.getItem('idUsuarioLogeado') ?? '';
   }
}
