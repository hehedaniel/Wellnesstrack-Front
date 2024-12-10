import { Component, Inject, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PesoService } from '../../../services/peso.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-form-editar-peso',
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
   ],
   templateUrl: './form-editar-peso.component.html',
   styleUrl: './form-editar-peso.component.css',
})
export class FormEditarPesoComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

   #dialog: MatDialog = inject(MatDialog);
   #pesoService: PesoService = inject(PesoService);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   peso: string = '';
   hora: string = '';
   fecha: string = '';
   idUsuario: string = '';

   nuevoValor: string = '';

   ngOnInit() {
      this.nuevoValor = this.data.peso;
      this.hora = this.data.hora;
      this.fecha = this.data.fecha;

      this.obtenerUsuario();
   }

   editarPeso() {
      console.log(this.nuevoValor == '');
      if (this.nuevoValor == '' || this.nuevoValor == undefined) {
         this.#snackBar.open('Por favor, rellene todos los campos', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      } else {
         this.#pesoService.putEditarPeso(this.idUsuario, this.fecha, this.hora, this.nuevoValor).subscribe((data: any) => {
            console.log(data);
            if (data.code === 200) {
               this.closeDialog();
               location.reload();
            }
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
