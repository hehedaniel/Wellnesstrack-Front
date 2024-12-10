import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatLabel, MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { AlimentosService } from '../../../services/alimentos.service';
import { AdministrarEjerciciosPropuestosComponent } from '../../global/administrar-propuestas/administrar-propuestas.component';
import { ResponsiveInfoService } from '../../../services/responsive-info.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-form-administrar-receta-propuesta',
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
   templateUrl: './form-administrar-receta-propuesta.component.html',
   styleUrl: './form-administrar-receta-propuesta.component.css',
})
export class FormAdministrarRecetaPropuestaComponent implements OnInit {
   constructor(
      private dialogRef: MatDialogRef<AdministrarEjerciciosPropuestosComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos inyectados
   ) {}

   #dialog: MatDialog = inject(MatDialog);
   #alimentosService: AlimentosService = inject(AlimentosService);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #responsiveInfoService: ResponsiveInfoService = inject(ResponsiveInfoService);

   // Datos de la receta
   nombre: string = '';
   dificultad: string = '';
   descripcion: string = '';
   instrucciones: string = '';
   cantidad: number = 1;
   proteinas: string = '';
   grasas: string = '';
   carbohidratos: string = '';
   azucares: string = '';
   // vitaminas: string = '';
   calorias: string = '';
   imagen: string = '';
   id: string = '';

   //  Responsive
   tamanoPantallaSub!: Subscription;
   tamanoPantalla: string = 'pantalla';

   ngOnInit() {
      this.nombre = this.data.nombre;
      this.dificultad = this.data.dificultad;
      this.descripcion = this.data.descripcion;
      this.instrucciones = this.data.instrucciones;
      this.cantidad = this.data.cantidad;
      this.proteinas = this.data.proteinas;
      this.grasas = this.data.grasas;
      this.carbohidratos = this.data.carbohidratos;
      this.azucares = this.data.azucares;
      this.calorias = this.data.calorias;
      this.imagen = this.data.imagen;
      this.id = this.data.id;

      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
      });
   }

   rechazarReceta() {
      this.#alimentosService.deleteEliminarReceta(this.data.id).subscribe((data: any) => {
         console.log(data);
         if (data.respuesta === 'Error') {
            this.#snackBar.open('Error al aceptar la receta', 'Cerrar', {
               duration: 2000,
            });
            return;
         }
         this.#snackBar.open('Receta aceptada correctamente', 'Cerrar', {
            duration: 2000,
         });
         this.dialogRef.close('administrado');
      });
   }

   aceptarReceta() {
      //Hago la peticion para aceptar el ejercicio
      this.#alimentosService.postAceptarReceta(this.data.id).subscribe((data: any) => {
         console.log(data);
         if (data.respuesta === 'Error') {
            this.#snackBar.open('Error al aceptar el ejercicio', 'Cerrar', {
               duration: 2000,
            });
            return;
         }
         this.#snackBar.open('Ejercicio aceptado correctamente', 'Cerrar', {
            duration: 2000,
         });
         this.dialogRef.close('administrado');
      });
   }
}
