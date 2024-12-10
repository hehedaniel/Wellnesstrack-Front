import { Component, inject } from '@angular/core';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormProponerAlimentoNutrientesComponent } from '../form-proponer-comida-nutrientes/form-proponer-alimento-nutrientes.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
   selector: 'app-form-proponer-alimento',
   standalone: true,
   imports: [
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
   ],
   templateUrl: './form-proponer-alimento.component.html',
   styleUrl: './form-proponer-alimento.component.css',
})
export class FormProponerAlimentoComponent {
   #dialog: MatDialog = inject(MatDialog);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   // Formulario
   nombre: string = '';
   cantidad: number = 1;
   marca: string = '';
   descripcion: string = '';
   imagen: string = '';

   base64Image: string = './assets/icons/imgComidaBlack36.svg';
   imgPreview: boolean = false;

   siguienteForm() {
      const dialogData = {
         tipo: 'alimento',
         nombre: 'Macarrones con salsa de queso roquefort',
         cantidad: this.cantidad,
         marca: this.marca,
         descripcion: this.descripcion,
         imagen: this.base64Image,
      };

      this.imgPreview = true;

      console.log(dialogData);

      this.#dialog.open(FormProponerAlimentoNutrientesComponent, {
         data: {
            dialogData,
         },
         width: '70%',
         height: 'auto',
         maxHeight: '90vh',
      });
   }

   subirImg(event: any) {
      const file: File = event.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => {
            const base64String = reader.result as string;
            this.base64Image = base64String;
         };
      }
   }

   cancelar() {
      this.#dialog.closeAll();
   }
}
