import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';
import { AdministrarEjerciciosPropuestosComponent } from '../../global/administrar-propuestas/administrar-propuestas.component';
import { FormEditarEnlaceEjercicioComponent } from '../form-editar-enlace-ejercicio/form-editar-enlace-ejercicio.component';
import { log } from 'console';
import { Enlace } from '../form-realizar-ejercicio/form-realizar-ejercicio.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SourceTextModule } from 'vm';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { YoutubeVideoPlayerComponent } from '../../global/youtube-video-player/youtube-video-player.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { PesoService } from '../../../services/peso.service';

export interface EnlaceEjercicio {
   titulo: string;
   url: string;
}

@Component({
   selector: 'app-form-administrar-ejercicio-propuesto',
   standalone: true,
   imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatAutocompleteModule,
      FormsModule,
      MatProgressSpinnerModule,
      SpinnerMostrarComponent,
   ],
   templateUrl: './form-administrar-ejercicio-propuesto.component.html',
   styleUrl: './form-administrar-ejercicio-propuesto.component.css',
})
export class FormAdministrarEjercicioPropuestoComponent implements OnInit {
   ruta = 'http://localhost:8000';
   #dialog: MatDialog = inject(MatDialog);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);

   // options: string[] = ['Escriba el nombre del ejercicio'];
   idOpciones: string[] = [''];
   ejerciciosRecibidosNombre: { nombre: string; id: string }[] = [];

   ejercicioSeleccionado: string = '';
   idEjercicioSeleccionado: string = '';

   tieneEnlaces: boolean = false;
   enlaces: Enlace[] = [];

   seleccionadoTiempo = false;
   guardandoEjercicio = false; // Variable para mostrar el spinner de carga
   formCorrecto: boolean = false; //Para saber cuando se ha rellenado el formulario correctamente
   tiempoEstado: boolean = true;

   nombreEjercicioFormulario: string = '';
   tiempoEjercicioFormulario: string = '';
   grupoMuscularEjercicioFormulario: string = '';
   descripcionEjercicioFormulario: string = '';
   instruccionesEjercicioFormulario: string = '';
   valorMetEjercicioFormulario: string = '';
   dificultadEjercicioFormulario: string = '';

   // Para cambiar conforme cambie el tiempo
   caloriasQuemadas: number = 0;

   ejercicioRecibido: boolean = false;

   constructor(
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<AdministrarEjerciciosPropuestosComponent>
   ) {}

   ngOnInit() {
      this.mostrar();
   }

   mostrar() {
      console.log(this.data);
      // Esta funcion muestra la informacion del ejercicio seleccionado
      if (this.data.nombre === undefined) {
         // Asigno valores por defecto a los campos
         this.grupoMuscularEjercicioFormulario = 'Grupo muscular';
         this.descripcionEjercicioFormulario = 'Descripcion del ejercicio';
         this.valorMetEjercicioFormulario = 'Valor Met';
         this.dificultadEjercicioFormulario = 'Dificultad';
         this.instruccionesEjercicioFormulario = 'Instrucciones del ejercicio';
      } else {
         //Asigno los valores correspondientes a los campos
         this.nombreEjercicioFormulario = this.data.nombre;
         this.grupoMuscularEjercicioFormulario = this.data.grupoMuscular;
         this.descripcionEjercicioFormulario = this.data.descripcion;
         this.valorMetEjercicioFormulario = this.data.valorMET;
         this.dificultadEjercicioFormulario = this.data.dificultad;
         this.instruccionesEjercicioFormulario = this.data.instrucciones;
         this.idEjercicioSeleccionado = this.data.id;
         this.tieneEnlaces = true;
         // console.log(this.data.enlaces);
         this.enlaces = this.data.enlaces;

         this.tiempoEstado = false;
         this.ejercicioRecibido = true;
      }
   }

   //  ------------------------- Funciones auxiliares

   // Abre el video de youtube en un dialog
   abrirVideo(url: string, event: MouseEvent) {
      event.preventDefault(); // Evita que el enlace navegue a otra página
      const videoId = this.extraerIDVideo(url);
      this.#dialog.open(YoutubeVideoPlayerComponent, {
         data: { videoId },
      });
   }

   extraerIDVideo(url: string): string {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('v') || '';
   }

   rechazarEjercicio() {
      this.#ejercicioService.putEliminarEjercicioPropuesto(this.data.id).subscribe((data: any) => {
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

   aceptarEjercicio() {
      //Hago la peticion para aceptar el ejercicio
      this.#ejercicioService.postAceptarEjercicio(this.data.id).subscribe((data: any) => {
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

   closeDialogSinAdministrar() {
      console.log('Cerrando diálogo sin administrar');

      this.dialogRef.close('postpuesto');
   }
}
