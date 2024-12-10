import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
   selector: 'app-form-eliminar-ejercicio-realizado',
   standalone: true,
   imports: [MatProgressSpinnerModule],
   templateUrl: './form-eliminar-ejercicio-realizado.component.html',
   styleUrl: './form-eliminar-ejercicio-realizado.component.css',
})
export class FormEliminarEjercicioRealizadoComponent {
   #dialog: MatDialog = inject(MatDialog);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);
   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);

   //Datos que recibo desde el otro componente
   nombre: string = '';
   calorias: string = '';
   tiempo: string = '';
   hora: string = '';
   fecha: string = '';

   idRecibiddo: boolean = false;

   // Datos que recibo en hacer la peticion
   idEjercicioSeleccionado: string = '';

   constructor(public dialogRef: MatDialogRef<FormEliminarEjercicioRealizadoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

   ngOnInit() {
      this.checkLogedIn();
      if (this.data && this.data.dialogData) {
         //Recojo y reasigno los datos que recibo
         this.nombre = this.data.dialogData.nombre;
         this.calorias = this.data.dialogData.calorias;
         this.tiempo = this.data.dialogData.tiempo;
         this.hora = this.data.dialogData.hora;
         this.fecha = this.data.dialogData.fecha;

         //Hago la peticion para obtener el ejercicio el resto de datos
         this.#ejercicioService.postBusquedaNombre(this.nombre).subscribe((data: any) => {
            this.idEjercicioSeleccionado = data.respuesta[0].id;
            this.idRecibiddo = true;
         });
      }
   }

   eliminarEjercicioRealizado() {
      const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
      if (idUsuario === '') {
         console.log('No se ha podido obtener el id del usuario');
         return;
      }
      this.#ejercicioService.deleteEjercicioRealizado(idUsuario, this.fecha, this.hora, this.idEjercicioSeleccionado).subscribe((data: any) => {
         //Si se ha eliminado correctamente
         if (data.respuesta === 'Ejercicio eliminado correctamente') {
            this.#snackBar.open('Ejercicio eliminado correctamente', '', {
               duration: 3000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
               panelClass: ['success-snackbar'],
            });
            this.closeDialog();
         } else {
            this.#snackBar.open('Error al eliminar el ejercicio', '', {
               horizontalPosition: 'center',
               verticalPosition: 'top',
               panelClass: ['error-snackbar'],
            });
         }
      });
   }

   checkLogedIn() {
      this.#authService.fbUserEmail().then((email) => {
         if (email !== null) {
            console.log(email);
         } else {
            console.log('Usuario no logeado');
            this.#router.navigate(['/login']);
         }
      });
   }

   closeDialog() {
      this.dialogRef.close();
   }
}
