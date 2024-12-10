import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormEditarEnlaceEjercicioComponent } from '../form-editar-enlace-ejercicio/form-editar-enlace-ejercicio.component';
import { DropdownModule } from 'primeng/dropdown';
import { ResponsiveInfoService } from '../../../services/responsive-info.service';
import { Subscription } from 'rxjs';
import { YoutubeVideoPlayerComponent } from '../../global/youtube-video-player/youtube-video-player.component';

@Component({
   selector: 'app-form-proponer-ejercicio',
   standalone: true,
   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, DropdownModule],
   templateUrl: './form-proponer-ejercicio.component.html',
   styleUrl: './form-proponer-ejercicio.component.css',
})
export class FormProponerEjercicioComponent implements OnInit {
   constructor(private dialogRef: MatDialogRef<FormEditarEnlaceEjercicioComponent>) {}

   ruta = 'http://localhost:8000';
   #dialog: MatDialog = inject(MatDialog);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);
   #responsiveInfoService: ResponsiveInfoService = inject(ResponsiveInfoService);

   formProponerEjercicio: FormGroup = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      dificultad: new FormControl('', [Validators.required]),
      grupoMuscular: new FormControl('', [Validators.required]),
      valorMet: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      instrucciones: new FormControl('', [Validators.required]),
   });

   opcionesDificultad: string[] = ['Principiante', 'Fácil', 'Intermedio', 'Difícil', 'Avanzado'];

   nombre: string = '';
   dificultad: string = '';
   descripcion: string = '';
   grupoMuscular: string = '';
   valorMet: string = '';
   instrucciones: string = '';
   seleccionadoValorMet: boolean = false;
   // Lista de enlaces y nuevo enlace
   enlaces: {
      numero: string;
      titulo: string;
      url: string;
   }[] = [
      {
         numero: '1',
         titulo: 'Enlace 1',
         url: 'Por defecto',
      },
      {
         numero: '2',
         titulo: 'Enlace 2',
         url: 'Por defecto',
      },
   ];
   // Opcion para saber si se han escrito los enlaces
   enlaceDisponible: boolean = false;
   tituloEnlace1 = 'Guarde un enlace';

   tamanoPantallaSub!: Subscription;
   tamanoPantalla: string = 'pantalla';

   ngOnInit(): void {
      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
      });
   }

   // Método para editar un enlace
   editarEnlace(numero: string, enlace: any) {
      const enlaceActual = this.enlaces.find((enlace) => enlace.numero === numero);

      if (enlaceActual) {
         // console.log('Enlace actual:', enlaceActual);
         localStorage.setItem('enlaceActual', JSON.stringify(enlaceActual));
         //Ahora mediante el numero de enlace, obtengo el enlace actual
         var dialogEditarEnlae;

         if (this.tamanoPantalla == 'mediana') {
            dialogEditarEnlae = this.#dialog.open(FormEditarEnlaceEjercicioComponent, {
               width: '60%',
               height: '40%',
               maxHeight: '100vh',
               disableClose: true,
            });
         } else if (this.tamanoPantalla == 'pequena') {
            dialogEditarEnlae = this.#dialog.open(FormEditarEnlaceEjercicioComponent, {
               width: '80%',
               height: '30%',
               maxHeight: '100vh',
               disableClose: true,
            });
         } else {
            dialogEditarEnlae = this.#dialog.open(FormEditarEnlaceEjercicioComponent, {
               width: '30%',
               height: '40%',
               maxHeight: '100vh',
               disableClose: true,
            });
         }

         dialogEditarEnlae.afterClosed().subscribe((result) => {
            // Obtengo el enlace que se ha editado
            // Lo guardo en la lista de enlaces
            if (localStorage.getItem('enlaceActual') !== enlaceActual.url) {
               enlaceActual.url = localStorage.getItem('enlaceActual') || '';
            }
         });

         this.enlaces = this.enlaces.map((enlace) => (enlace.numero === numero ? enlaceActual : enlace));
         this.enlaceDisponible = true;
      } else {
         this.#snackBar.open('No se ha encontrado el enlace', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      }
   }

   abrirVideo(url: string, event: MouseEvent) {
      event.preventDefault();

      if (!this.enlaceDisponible) {
         this.#snackBar.open('Guarde un enlace primero', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      } else {
         const videoId = this.extraerIDVideo(url);
         this.#dialog.open(YoutubeVideoPlayerComponent, {
            data: { videoId },
         });
      }
   }

   extraerIDVideo(url: string): string {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('v') || '';
   }

   // Método para enviar la propuesta
   enviarPropuestaEjercicio() {
      //Primero obtengo el id del usuario logeado
      const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
      if (idUsuario === '') {
         console.log('No se ha podido obtener el id del usuario');
         return;
      }

      //Ahora obtengo todos los datos del formulario
      this.nombre = this.formProponerEjercicio.get('nombre')?.value;
      this.dificultad = this.formProponerEjercicio.get('dificultad')?.value;
      this.descripcion = this.formProponerEjercicio.get('descripcion')?.value;
      this.grupoMuscular = this.formProponerEjercicio.get('grupoMuscular')?.value;
      this.valorMet = this.formProponerEjercicio.get('valorMet')?.value;
      this.instrucciones = this.formProponerEjercicio.get('instrucciones')?.value;
      const enlace1 = this.enlaces[0].url;
      const enlace2 = this.enlaces[1].url;

      // Compruebo que todos los campos sean correctos

      if (
         this.nombre === '' ||
         this.dificultad === '' ||
         this.descripcion === '' ||
         this.grupoMuscular === '' ||
         this.valorMet === '' ||
         this.instrucciones === '' ||
         enlace1 === '' ||
         enlace2 === ''
      ) {
         this.#snackBar.open('Todos los campos son obligatorios', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      } else if (parseInt(this.valorMet) < 1) {
         this.#snackBar.open('El valor MET debe ser mayor que 0', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      }

      //Ahora hacemos la peticion al backend
      this.#ejercicioService
         .postProponerEjercicio(
            this.nombre,
            this.dificultad,
            this.grupoMuscular,
            this.valorMet,
            this.descripcion,
            this.instrucciones,
            idUsuario,
            enlace1,
            enlace2
         )
         .subscribe((data: any) => {
            console.log(data);
            if (data.code === 200) {
               this.#dialog.closeAll();
               this.#snackBar.open('Ejercicio propuesto correctamente', '', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar'],
               });
            } else {
               this.#snackBar.open('Ha habido un error al proponer el ejercicio', '', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar'],
               });
            }
         });
   }

   closeDialog() {
      this.dialogRef.close();
   }

   focusValorMet() {
      this.seleccionadoValorMet = true;
   }
}
