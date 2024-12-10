import { Component, Inject, inject } from '@angular/core';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlimentosService } from '../../../services/alimentos.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface alimentoEnviar {
   nombre: string;
   descripcion: string;
   marca: string;
   imagen: string;
   cantidad: string;
   calorias: number;
   proteinas: number;
   azucares: number;
   grasas: number;
   carbohidratos: number;
}

export interface recetaEnviar {
   nombre: string;
   descripcion: string;
   instrucciones: string;
   imagen: string;
   cantidad: string;
   calorias: number;
   proteinas: number;
   azucares: number;
   grasas: number;
   carbohidratos: number;
}

@Component({
   selector: 'app-form-proponer-alimento-nutrientes',
   standalone: true,
   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, FloatLabelModule, FormsModule, ImageModule, InputNumberModule],
   templateUrl: './form-proponer-alimento-nutrientes.component.html',
   styleUrl: './form-proponer-alimento-nutrientes.component.css',
})
export class FormProponerAlimentoNutrientesComponent {
   constructor(
      @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos inyectados
   ) {}

   #router: Router = inject(Router);
   #alimentoService: AlimentosService = inject(AlimentosService);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #dialog: MatDialog = inject(MatDialog);

   // Formulario
   calorias: number = 0;
   proteinas: number = 0;
   azucares: number = 0;
   grasas: number = 0;
   // vitaminas: number = 0;
   carbohidratos: number = 0;

   //Recibido del formulario anterior
   comidaNombre: string = '';
   comidaCantidad: string = '';
   comidaDescripcion: string = '';
   comidaImagen: string = '';

   alimentoMarca: string = '';
   recetaInstrucciones: string = '';

   usuarioID: string = localStorage.getItem('idUsuarioLogeado') || '';

   ngOnInit() {
      //Recibo los datos del formulario anterior
      console.log(this.data);
      console.log(this.data.dialogData.nombre);
      this.comidaNombre = this.data.dialogData.nombre;
      this.comidaCantidad = this.data.dialogData.cantidad;
      this.comidaDescripcion = this.data.dialogData.descripcion;
      this.comidaImagen = this.data.dialogData.imagen;

      if (this.data.tipo == 'alimento') {
         this.alimentoMarca = this.data.dialogData.marca;
      } else {
         this.recetaInstrucciones = this.data.dialogData.instrucciones;
      }
   }

   proponer() {
      //Compruebo que los campos no tengan valor 0 o estén vacíos
      if (this.calorias == 0 || this.proteinas == 0 || this.azucares == 0 || this.grasas == 0 || this.carbohidratos == 0) {
         this.#snackBar.open('Por favor rellene todos los campos de forma correcta', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      }

      //Distingo entre alimento o receta para enviar los datos
      if (this.data.tipo == 'alimento') {
         //Guardo los valores nutricionales en un array
         const alimentoEnviar: alimentoEnviar = {
            nombre: this.comidaNombre,
            descripcion: this.comidaDescripcion,
            marca: this.alimentoMarca,
            imagen: this.comidaImagen,
            cantidad: this.comidaCantidad,
            calorias: this.calorias,
            proteinas: this.proteinas,
            azucares: this.azucares,
            grasas: this.grasas,
            carbohidratos: this.carbohidratos,
         };

         console.log(alimentoEnviar, this.usuarioID);

         this.#alimentoService.postProponerAlimento(alimentoEnviar, this.usuarioID).subscribe((res: any) => {
            //Si la respuesta es correcta, redirijo a la pantalla de alimentos
            if (res.respuesta === 'El alimento ya existe') {
               this.#snackBar.open('Este alimento ya existe', '', {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar'],
               });
            } else if (res.code == 200) {
               this.#router.navigate(['comidas']);
            }
         });
      } else {
         //Guardo los valores nutricionales en un array
         const recetaEnviar: recetaEnviar = {
            nombre: this.comidaNombre,
            descripcion: this.comidaDescripcion,
            instrucciones: this.recetaInstrucciones,
            imagen: this.comidaImagen,
            cantidad: this.comidaCantidad,
            calorias: this.calorias,
            proteinas: this.proteinas,
            azucares: this.azucares,
            grasas: this.grasas,
            // vitaminas: this.vitaminas,
            carbohidratos: this.carbohidratos,
         };

         console.log(recetaEnviar, this.usuarioID);

         this.#alimentoService.postProponerReceta(recetaEnviar, this.usuarioID).subscribe((res: any) => {
            //Si la respuesta es correcta, redirijo a la pantalla de alimentos
            if (res.respuesta === 'Ya existe una receta con el mismo nombre' || res.respuesta === 'No se han recibido datos') {
               console.log('mal');

               this.#snackBar.open('Esta receta ya existe', '', {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar'],
               });
            } else if (res.code == 200) {
               this.#router.navigate(['comidas']);
               this.#dialog.closeAll();
               //Le indico al usuario que la receta se ha propuesto correctamente
               this.#snackBar.open('Receta propuesta correctamente', '', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar'],
               });
            }
         });
      }
   }
}
