import { Component, Inject, inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormProponerEjercicioComponent } from '../form-proponer-ejercicio/form-proponer-ejercicio.component';
import { YoutubeVideoPlayerComponent } from '../../global/youtube-video-player/youtube-video-player.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AlimentosService } from '../../../services/alimentos.service';
import { SwitchProponerComidaComponent } from '../../comidas/switch-proponer-comida/switch-proponer-comida.component';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
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
   selector: 'app-info-ejercicio',
   standalone: true,
   imports: [
      MatInputModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
      SpinnerMostrarComponent,
      MatButtonModule,
      FloatLabelModule,
      ImageModule,
      InputNumberModule,
      AutoCompleteModule,
   ],
   templateUrl: './info-ejercicio.component.html',
   styleUrl: './info-ejercicio.component.css',
})
export class InfoEjercicioComponent {
   constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

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

   ejercicioRecibido: boolean = false;

   // Responsive
   tamanoPantalla: string = 'pantalla';
   tamanoPantallaSub!: Subscription;

   ngOnInit() {
      this.checkLogedIn();
      this.mostrar();
      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
      });
   }

   mostrar() {
      // Esta funcion muestra la informacion del ejercicio seleccionado
      if (this.data.ejercicio.nombre == 'undefined') {
         // Asigno valores por defecto a los campos
         this.grupoMuscularEjercicioFormulario = 'Grupo muscular';
         this.descripcionEjercicioFormulario = 'Descripcion del ejercicio';
         this.valorMetEjercicioFormulario = 'Valor Met';
         this.dificultadEjercicioFormulario = 'Dificultad';
         this.instruccionesEjercicioFormulario = 'Instrucciones del ejercicio';
      } else {
         this.#ejercicioService.postBusquedaNombre(this.data.ejercicio.nombre).subscribe((data: any) => {
            //Asigno los valores correspondientes a los campos
            this.nombreEjercicioFormulario = data.respuesta[0].nombre;
            this.grupoMuscularEjercicioFormulario = data.respuesta[0].grupoMuscular;
            this.descripcionEjercicioFormulario = data.respuesta[0].descripcion;
            this.valorMetEjercicioFormulario = data.respuesta[0].valorMET;
            this.dificultadEjercicioFormulario = data.respuesta[0].dificultad;
            this.instruccionesEjercicioFormulario = data.respuesta[0].instrucciones;
            this.idEjercicioSeleccionado = data.respuesta[0].id;
            this.tieneEnlaces = true;
            // console.log(data.respuesta[0].enlaces);
            this.enlaces = data.respuesta[0].enlaces;

            this.tiempoEstado = false;
            this.ejercicioRecibido = true;
         });
      }
   }

   //  ------------------------- Funciones auxiliares

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
         width: 'auto',
         data: { videoId },
      });
   }

   private extraerIDVideo(url: string): string {
      const urlObject = new URL(url);

      const urlParams = new URLSearchParams(urlObject.search);
      if (urlParams.has('v')) {
         return urlParams.get('v') || '';
      }

      if (urlObject.pathname.startsWith('/shorts/')) {
         return urlObject.pathname.split('/').pop() || '';
      }

      return '';
   }

   closeDialog() {
      this.#dialog.closeAll();
   }
}
