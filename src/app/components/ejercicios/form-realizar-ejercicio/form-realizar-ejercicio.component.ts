import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormProponerEjercicioComponent } from '../form-proponer-ejercicio/form-proponer-ejercicio.component';
import { YoutubeVideoPlayerComponent } from '../../global/youtube-video-player/youtube-video-player.component';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { PesoService } from '../../../services/peso.service';
import { ResponsiveInfoService } from '../../../services/responsive-info.service';
import { Subscription } from 'rxjs';

export interface Enlace {
   url: string;
}

@Component({
   selector: 'app-form-realizar-ejercicio',
   standalone: true,
   imports: [
      MatInputModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
      MatButtonModule,
      FloatLabelModule,
      ImageModule,
      InputNumberModule,
      AutoCompleteModule,
   ],
   templateUrl: './form-realizar-ejercicio.component.html',
   styleUrl: './form-realizar-ejercicio.component.css',
})
export class FormRealizarEjercicioComponent {
   constructor(private dialog: MatDialog) {}

   ruta = 'http://localhost:8000';
   #dialog: MatDialog = inject(MatDialog);
   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);
   #pesoService: PesoService = inject(PesoService);
   #responsiveInfoService: ResponsiveInfoService = inject(ResponsiveInfoService);

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

   // Para el responsive
   private tamanoPantallaSub!: Subscription;
   tamanoPantalla: string = 'pantalla';

   ngOnInit() {
      this.checkLogedIn();

      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
      });
   }

   onInputChange(): void {
      const nombre = this.nombreEjercicioFormulario;
      console.log(nombre);
      this.#ejercicioService.postBusquedaNombre(nombre).subscribe((data: any) => {
         let ejRecibidosNombre: { nombre: string; id: string }[] = []; // Resetear cada vez que se hace una búsqueda
         if (data.respuesta === 'No se ha encontrado el ejercicio') {
            ejRecibidosNombre.push({ nombre: 'No se encontraron resultados, propón el tuyo!', id: '' });
         } else {
            data.respuesta
               .filter((respuesta: any) => respuesta.id !== undefined)
               .forEach((respuesta: any) => {
                  ejRecibidosNombre.push(respuesta.nombre);
                  this.idOpciones.push(respuesta.id);
               });
         }
         this.ejerciciosRecibidosNombre = ejRecibidosNombre;
         console.log(this.ejerciciosRecibidosNombre);
      });
   }

   mostrar(opcion: any) {
      // Esta funcion muestra la informacion del ejercicio seleccionado
      if (opcion == 'undefined') {
         // Asigno valores por defecto a los campos
         this.grupoMuscularEjercicioFormulario = 'Grupo muscular';
         this.descripcionEjercicioFormulario = 'Descripcion del ejercicio';
         this.valorMetEjercicioFormulario = 'Valor Met';
         this.dificultadEjercicioFormulario = 'Dificultad';
         this.instruccionesEjercicioFormulario = 'Instrucciones del ejercicio';
      } else {
         this.#ejercicioService.postBusquedaNombre(opcion).subscribe((data: any) => {
            //Asigno los valores correspondientes a los campos
            this.grupoMuscularEjercicioFormulario = data.respuesta[0].grupoMuscular;
            this.descripcionEjercicioFormulario = data.respuesta[0].descripcion;
            this.valorMetEjercicioFormulario = data.respuesta[0].valorMET;
            this.dificultadEjercicioFormulario = data.respuesta[0].dificultad;
            this.instruccionesEjercicioFormulario = data.respuesta[0].instrucciones;
            this.idEjercicioSeleccionado = data.respuesta[0].id;
            this.tieneEnlaces = true;
            console.log(data.respuesta[0].enlaces);
            this.enlaces = data.respuesta[0].enlaces;

            this.tiempoEstado = false;
         });
      }
   }

   guardarEjercicioRealizado() {
      const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
      if (idUsuario === '') {
         console.log('No se ha podido obtener el id del usuario');
         return;
      }

      const tiempo = this.tiempoEjercicioFormulario || '';
      const met = this.valorMetEjercicioFormulario || '';
      const idEjercicio = this.idEjercicioSeleccionado;

      // Comprueba que se han introducido todos los datos
      if (tiempo === '' || idEjercicio === '' || tiempo === undefined || idEjercicio === undefined) {
         this.#snackBar.open('Por favor, rellene todos los campos', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      }

      this.guardandoEjercicio = true;
      this.mostrarSpinnerCarga(); // Muestra el spinner de carga

      // Hago la petición para guardar el ejercicio realizado
      this.#ejercicioService.postEjercicioRealizadoGuardar(idEjercicio, idUsuario, tiempo, met).subscribe((data: any) => {
         // console.log(data);
         this.mostrarSpinnerCarga(); // Oculta el spinner de carga
         if (data.code === 200) {
            this.#dialog.closeAll();
            location.reload();
            this.#snackBar.open('Ejercicio guardado correctamente', '', {
               duration: 3000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
               panelClass: ['success-snackbar'],
            });
         } else {
            this.#snackBar.open('No ha sido posible guardar el ejercicio', '', {
               duration: 4000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
               panelClass: ['error-snackbar'],
            });
         }
      });
   }

   calcularCalorias() {
      const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
      if (idUsuario === '') {
         return;
      }
      this.#pesoService.postUltimoPeso(idUsuario).subscribe((data: any) => {
         console.log(data);
         const peso = data.respuesta.peso;
         const tiempo = this.tiempoEjercicioFormulario;
         const met = this.valorMetEjercicioFormulario;
         if (isNaN(parseInt(met)) || isNaN(parseInt(peso)) || isNaN(parseInt(tiempo))) {
            this.#snackBar.open('No se han podido calcular las calorias', '', {
               duration: 3000,
               horizontalPosition: 'center',
               verticalPosition: 'top',
               panelClass: ['error-snackbar'],
            });
            return;
         }
         this.caloriasQuemadas = parseInt(met) * parseFloat(peso) * parseInt(tiempo);
         this.formCorrecto = true;
      });
   }

   openDialogProponer() {
      this.#dialog.open(FormProponerEjercicioComponent, {
         width: '70%',
         height: 'auto',
         maxHeight: '90vh',
      });
   }

   //  ------------------------- Funciones auxiliares

   mostrarSpinnerCarga() {
      var dialogRef: MatDialogRef<SpinnerMostrarComponent> | undefined;

      if (this.guardandoEjercicio) {
         dialogRef = this.#dialog.open(SpinnerMostrarComponent, {
            disableClose: true,
         });
      } else {
         dialogRef?.close();
      }
   }

   // Comprueba si el usuario está logeado
   checkLogedIn() {
      this.#authService.fbUserEmail().then((email) => {
         if (email !== null) {
            // console.log('Usuario logeado');
         } else {
            console.log('Usuario no logeado');
            this.#router.navigate(['/login']);
         }
      });
   }

   // Abre el video de youtube en un dialog
   abrirVideo(url: string, event: MouseEvent) {
      event.preventDefault(); // Evita que el enlace navegue a otra página
      const videoId = this.extraerIDVideo(url);
      this.#dialog.open(YoutubeVideoPlayerComponent, {
         data: { videoId },
      });
   }

   private extraerIDVideo(url: string): string {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('v') || '';
   }

   openDialog() {
      this.#dialog.open(FormRealizarEjercicioComponent);
   }

   closeDialog() {
      this.#dialog.closeAll();
   }

   // focusTiempo(){
   //   this.seleccionadoTiempo = true;
   // }
}
