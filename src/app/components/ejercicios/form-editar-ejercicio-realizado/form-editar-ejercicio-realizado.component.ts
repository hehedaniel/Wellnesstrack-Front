import { Component, Inject, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YoutubeVideoPlayerComponent } from '../../global/youtube-video-player/youtube-video-player.component';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { PesoService } from '../../../services/peso.service';
import { FormRealizarEjercicioComponent } from '../form-realizar-ejercicio/form-realizar-ejercicio.component';

export interface Enlace {
   url: string;
}

@Component({
   selector: 'app-form-editar-ejercicio-realizado',
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
      SpinnerMostrarComponent,
   ],
   templateUrl: './form-editar-ejercicio-realizado.component.html',
   styleUrl: './form-editar-ejercicio-realizado.component.css',
})
export class FormEditarEjercicioRealizadoComponent {
   constructor(public dialogRef: MatDialogRef<FormEditarEjercicioRealizadoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

   // Falta recibir los datos y mostrarlos en el formulario

   ruta = 'http://localhost:8000';
   #dialog: MatDialog = inject(MatDialog);
   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);
   #pesoService: PesoService = inject(PesoService);

   idOpciones: string[] = [''];
   ejerciciosRecibidosNombre: { nombre: string; id: string }[] = [];

   //Para saber en que momento mostrar el formulario
   recibiendoDatos = true;

   ejercicioSeleccionado: string = '';
   idEjercicioSeleccionado: string = '';
   ejercicioViejoPorGuardar = true;
   idEjercicioViejo: string = '';

   tieneEnlaces: boolean = false;
   enlaces: Enlace[] = [];

   seleccionadoTiempo = false;
   guardandoEjercicio = false; // Variable para mostrar el spinner de carga
   formCorrecto: boolean = false; //Para saber cuando se ha rellenado el formulario correctamente
   tiempoEstado: boolean = true;

   //Datos recibidos del padre
   fechaEjercicio: string = '';
   horaEjercicio: string = '';

   nombreEjercicioFormulario: string = '';
   tiempoEjercicioFormulario: string = '';
   grupoMuscularEjercicioFormulario: string = '';
   descripcionEjercicioFormulario: string = '';
   instruccionesEjercicioFormulario: string = '';
   valorMetEjercicioFormulario: string = '';
   dificultadEjercicioFormulario: string = '';

   // Para cambiar conforme cambie el tiempo
   caloriasQuemadas: number = 0;

   ngOnInit() {
      console.log(this.data);

      this.cargarDatos();

      this.checkLogedIn();
   }

   cargarDatos() {
      //Recibo los datos mediante el dialog y los muestro en el formulario
      console.log(this.data.dialogData);

      //Compruebo q todos los datos son correctos
      if (
         this.data.dialogData.tiempo === undefined ||
         this.data.dialogData.nombre === undefined ||
         this.data.dialogData.fecha === undefined ||
         this.data.dialogData.hora === undefined ||
         this.data.dialogData.tiempo == '' ||
         this.data.dialogData.nombre == '' ||
         this.data.dialogData.fecha == '' ||
         this.data.dialogData.hora == ''
      ) {
         this.#dialog.closeAll();
         this.#snackBar.open('No se han podido cargar los datos', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      }

      this.nombreEjercicioFormulario = this.data.dialogData.nombre;
      this.fechaEjercicio = this.data.dialogData.fecha;
      this.horaEjercicio = this.data.dialogData.hora;
      this.tiempoEjercicioFormulario = this.data.dialogData.tiempo;
      this.mostrar(this.nombreEjercicioFormulario);
      // Espeo un segundo y meido muestro el formulario
      setTimeout(() => {
         this.recibiendoDatos = false;
         this.calcularCalorias();
      }, 1000);
   }

   onInputChange(): void {
      const nombre = this.nombreEjercicioFormulario;
      console.log(nombre);
      this.#ejercicioService.postBusquedaNombre(nombre).subscribe((data: any) => {
         let ejRecibidosNombre: { nombre: string; id: string }[] = [];
         if (data.respuesta === 'No se ha encontrado el ejercicio') {
            ejRecibidosNombre.push({
               nombre: 'No se encontraron resultados, propón el tuyo!',
               id: '',
            });
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

            //GUardo el ejercicio que ha seleccinado el usuario
            this.idEjercicioSeleccionado = data.respuesta[0].id;
            //Para saber el ejercicio anterior que habia guardado
            if (this.ejercicioViejoPorGuardar) {
               this.ejercicioViejoPorGuardar = false;
               this.idEjercicioViejo = data.respuesta[0].id;
            }

            this.tieneEnlaces = true;
            console.log(data.respuesta[0].enlaces);
            this.enlaces = data.respuesta[0].enlaces;

            this.tiempoEstado = false;
         });
      }
   }

   guardarEjercicioEditado() {
      //Recojo todos los datos que debo enviar en la peticion
      const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
      if (idUsuario === '') {
         console.log('No se ha podido obtener el id del usuario');
         return;
      }

      const tiempo = this.tiempoEjercicioFormulario || '';
      const met = this.valorMetEjercicioFormulario || '';
      const idEjercicioNuevo = this.idEjercicioSeleccionado;

      // Comprueba que se han introducido todos los datos
      if (tiempo === '' || idEjercicioNuevo === '' || tiempo === undefined || idEjercicioNuevo === undefined) {
         this.#snackBar.open('Por favor, rellene todos los campos', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      }

      const idEjercicioViejo = this.idEjercicioViejo;
      const fecha = this.fechaEjercicio;
      const hora = this.horaEjercicio;

      this.guardandoEjercicio = true;
      this.mostrarSpinnerCarga(); // Muestra el spinner de carga

      // Hago la petición para guardar el ejercicio realizado
      this.#ejercicioService
         .putEditarEjercicioRealizado(idUsuario, fecha, hora, idEjercicioViejo, tiempo, idEjercicioNuevo, met)
         .subscribe((data: any) => {
            // console.log(data);
            this.mostrarSpinnerCarga(); // Oculta el spinner de carga
            if (data.code === 200) {
               this.#dialog.closeAll();
               location.reload();
               this.#snackBar.open('Ejercicio editado correctamente', '', {
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
            this.formCorrecto = false;
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

   //Funciones extra

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

   checkLogedIn() {
      this.#authService.fbUserEmail().then((email) => {
         if (email !== null) {
            console.log('Usuario logeado');
         } else {
            console.log('Usuario no logeado');
            this.#router.navigate(['/login']);
         }
      });
   }

   openDialog() {
      this.#dialog.open(FormRealizarEjercicioComponent);
   }

   closeDialog() {
      this.#dialog.closeAll();
   }

   openDialogProponer() {
      this.#dialog.open(FormRealizarEjercicioComponent, {
         width: '80%',
         height: 'auto',
         maxHeight: '90vh',
      });
   }

   obtenerFecha() {
      const date = new Date();
      return date.toISOString().split('T')[0];
   }
   obtenerHora() {
      const date = new Date();
      return date.toISOString().split('T')[1].split('.')[0];
   }
}
