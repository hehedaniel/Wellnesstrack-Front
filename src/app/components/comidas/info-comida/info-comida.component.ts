import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlimentosService } from '../../../services/alimentos.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ResponsiveInfoService } from '../../../services/responsive-info.service';
import { Subscription } from 'rxjs';

export interface AlimentoRecibido {
   nombre: string;
   tipo: string;
}

@Component({
   selector: 'app-info-comida',
   standalone: true,
   imports: [
      MatInputModule,
      MatInputModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
      SpinnerMostrarComponent,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      SpinnerMostrarComponent,
      FloatLabelModule,
      FormsModule,
      ImageModule,
      InputNumberModule,
      SpinnerMostrarComponent,
      FloatLabelModule,
      FormsModule,
      ImageModule,
      InputNumberModule,
      AutoCompleteModule,
   ],
   templateUrl: './info-comida.component.html',
   styleUrl: './info-comida.component.css',
})
export class InfoComidaComponent implements OnInit {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

   ruta = 'http://localhost:8000';
   #dialog: MatDialog = inject(MatDialog);
   #router: Router = inject(Router);
   #snackBar: MatSnackBar = inject(MatSnackBar);
   #authService: AuthService = inject(AuthService);
   #usuarioService: UsuarioService = inject(UsuarioService);
   #responsiveInfoService: ResponsiveInfoService = inject(ResponsiveInfoService);
   #alimentoService: AlimentosService = inject(AlimentosService);

   myControl = new FormControl('');
   options: string[] = ['Escriba el nombre del alimento'];
   //Array con los alimentos que se han encontrado
   opcionesAlimentos: AlimentoRecibido[] = [];
   opcionesAlimentosNombre: any;

   // Campos del formulario
   textareaContent: string = 'Descripción del alimento';
   instrucciones: string = '';
   imagen: string = '';
   marca: string = '';
   cantidad: string = '';
   calorias: string = '';
   proteinas: string = '';
   grasas: string = '';
   carbohidratos: string = '';
   azucares: string = '';

   receta: boolean = false;
   //La seleccion del alimento
   nombreAlimento: string = '';

   comidaSeleccionada: string = '';
   base64Image: string = './assets/icons/noImgBlack36.svg';
   imgPreview: boolean = false;

   // Para saber cuando se esta realizando la peticion
   guardandoConsumo: boolean = false;

   cantidadDisable: boolean = true;
   dataNutrientes: any;

   recetaInfoDisponible: boolean = false;

   //  Responsive
   tamanoPantallaSub!: Subscription;
   tamanoPantalla: string = 'pantalla';

   ngOnInit(): void {
      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
      });

      const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';

      if (idUsuario === '') {
         this.#router.navigate(['/login']);
      }
      const fecha = this.data.comida.Dia;
      const hora = this.data.comida.Hora;

      console.log(fecha);
      console.log(hora);

      this.#alimentoService.postConsumoDiarioNombre(idUsuario, fecha, hora).subscribe((res: any) => {
         if (res.respuesta === 'No se ha encontrado el alimento') {
            this.#dialog.closeAll();
            this.#snackBar.open('No se ha encontrado el alimento', 'Cerrar', {
               duration: 5000,
            });
         } else {
            this.nombreAlimento = res.respuesta.comida;
            this.textareaContent = res.respuesta.descripcion;
            this.cantidad = res.respuesta.cantidad;

            this.proteinas = res.respuesta.nutrientes.proteinas;
            this.carbohidratos = res.respuesta.nutrientes.carbohidratos;
            this.grasas = res.respuesta.nutrientes.grasas;
            this.azucares = res.respuesta.nutrientes.azucares;
            this.calorias = res.respuesta.nutrientes.calorias;

            this.imagen = res.respuesta.imagen;
            this.imgPreview = true;
            this.base64Image = res.respuesta.imagen;

            // Determino si es una receta
            if (res.respuesta.marca === undefined) {
               this.receta = true;
               this.instrucciones = res.respuesta.instrucciones;
            } else {
               this.receta = false;
               this.marca = res.respuesta.marca;
            }

            console.log(res.respuesta);
         }
         setTimeout(() => {
            this.recetaInfoDisponible = true;
         }, 900);
      });
   }
}
