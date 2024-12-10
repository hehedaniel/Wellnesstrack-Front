import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlimentosService } from '../../../services/alimentos.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwitchProponerComidaComponent } from '../../comidas/switch-proponer-comida/switch-proponer-comida.component';
import { MatButtonModule } from '@angular/material/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ResponsiveInfoService } from '../../../services/responsive-info.service';
import { Subscription } from 'rxjs';

export interface AlimentoRecibido {
   nombre: string;
   tipo: string;
}

@Component({
   selector: 'app-form-consumir',
   standalone: true,
   imports: [
      MatInputModule,
      MatInputModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
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
      AutoCompleteModule,
   ],
   providers: [provideNativeDateAdapter()],
   templateUrl: './form-consumir.component.html',
   styleUrl: './form-consumir.component.css',
})
export class FormConsumirComponent implements OnInit {
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

   // Para el responsive
   tamanoPantalla: string = 'pantalla';
   tamanoPantallaSub!: Subscription;

   ngOnInit(): void {
      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
         console.log(this.tamanoPantalla);
      });
   }

   closeDialog() {
      this.#dialog.closeAll();
   }

   onInputChange(event: string): void {
      this.#alimentoService.getBusquedaNombre(event).subscribe((data: any) => {
         console.log(data.respuesta);
         let alimentosRecibidos: AlimentoRecibido[] = [];
         let alimentosRecibidosNombre = [];
         if (data.respuesta === 'No se ha encontrado el alimento') {
            alimentosRecibidos.push({ nombre: 'No se encontraron resultados, propón el tuyo!', tipo: 'no-encontrado' });
         } else {
            for (const alimento of data.respuesta) {
               // Distingo entre alimentos y recetas segun si tienen marca o no
               if (alimento.marca == undefined) {
                  //Guardo el nombre y el tipo
                  console.log(alimento.nombre);
                  console.log(alimento.marca);

                  alimentosRecibidos.push({ nombre: alimento.nombre, tipo: 'receta' });
                  alimentosRecibidosNombre.push(alimento.nombre);
               } else {
                  alimentosRecibidos.push({ nombre: alimento.nombre, tipo: 'alimento' });
                  alimentosRecibidosNombre.push(alimento.nombre);
               }
            }
         }
         this.opcionesAlimentos = alimentosRecibidos;
         this.opcionesAlimentosNombre = alimentosRecibidosNombre;
      });
   }

   mostrar(opcion: any) {
      // console.log(opcion);

      // Busco en el array de alimentos recibidos el alimento seleccionado
      opcion = this.opcionesAlimentos.find((alimento) => alimento.nombre === opcion);
      // Esta funcion muestra la informacion del alimento seleccionado
      if (opcion == undefined) {
      } else {
         // Compruebo si es una receta o un alimento
         if (opcion.tipo == 'receta') {
            this.#alimentoService.getBusquedaReceta(opcion.nombre).subscribe((data: any) => {
               // console.log(data.respuesta[0].imagen);
               this.receta = true;
               this.imgPreview = true;
               this.textareaContent = data.respuesta[0].descripcion;
               this.comidaSeleccionada = data.respuesta[0].nombre;
               this.base64Image = data.respuesta[0].imagen;
               this.instrucciones = data.respuesta[0].instrucciones;
               this.calorias = data.respuesta[0].calorias;
               this.proteinas = data.respuesta[0].proteinas;
               this.grasas = data.respuesta[0].grasas;
               this.carbohidratos = data.respuesta[0].carbohidratos;
               this.azucares = data.respuesta[0].azucares;

               //me guardo el data para usarlo al itrnoducir una cantidad
               this.dataNutrientes = data.respuesta[0];
            });
         } else {
            this.#alimentoService.getBusquedaNombre(opcion.nombre).subscribe((data: any) => {
               // console.log(data.respuesta);
               this.imgPreview = true;
               this.receta = false;
               this.textareaContent = data.respuesta[0].descripcion;
               this.comidaSeleccionada = data.respuesta[0].nombre;
               this.base64Image = data.respuesta[0].imagen;
               this.marca = data.respuesta[0].marca;
               this.calorias = data.respuesta[0].calorias;
               this.proteinas = data.respuesta[0].proteinas;
               this.grasas = data.respuesta[0].grasas;
               this.carbohidratos = data.respuesta[0].carbohidratos;
               this.azucares = data.respuesta[0].azucares;

               //me guardo el data para usarlo al itrnoducir una cantidad
               this.dataNutrientes = data.respuesta[0];
            });
         }
      }
   }

   guardarConsumo(cantidad: string) {
      console.log(cantidad);
      console.log(this.cantidad);
      if (cantidad == '' || parseInt(cantidad) < 1) {
         this.#snackBar.open('Cantidad introducida no válida', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      } else if (
         this.comidaSeleccionada === '' ||
         this.comidaSeleccionada === 'No se encontraron resultados, propón el tuyo!' ||
         this.comidaSeleccionada === undefined
      ) {
         this.#snackBar.open('Alimento seleccionado no válido', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      } else {
         this.guardandoConsumo = true;
         // Aqui se realiza la peticion para guardar el consumo
         const idUsuario = this.getIDUsuario();
         const fechaActual = new Date();
         const fecha = fechaActual.toISOString().split('T')[0];
         const hora = fechaActual.toISOString().split('T')[1].split('.')[0];

         let momento: string;
         const horaActual = fechaActual.getHours();

         if (horaActual >= 6 && horaActual < 10) {
            momento = 'Desayuno';
         } else if (horaActual >= 12 && horaActual < 16) {
            momento = 'Almuerzo';
         } else if (horaActual >= 20 && horaActual < 24) {
            momento = 'Cena';
         } else {
            momento = 'Entre horas';
         }
         this.#alimentoService.postConsumoDiarioGuardar(idUsuario, cantidad, momento, fecha, hora, this.comidaSeleccionada).subscribe((data: any) => {
            console.log(data.respuesta);
            if (data.code == 200) {
               this.#dialog.closeAll();
               this.guardandoConsumo = false;
               this.#snackBar.open('Consumo guardado correctamente', '', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar'],
               });
               //Espero para recargar la pagina
               setTimeout(() => {
                  location.reload();
               }, 3500);
            } else {
               this.guardandoConsumo = false;
               this.#snackBar.open('Error al guardar el consumo', '', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar'],
               });
            }
         });
      }
   }

   onCantidadChange(cantidad: string) {
      //Funcion para actualizar los nutrientes segun la cantidad introducida
      if (cantidad === '' || parseInt(cantidad) < 1) {
         this.#snackBar.open('Cantidad introducida no válida', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      } else {
         console.log(this.dataNutrientes);

         if (this.dataNutrientes.cantidad === undefined) {
            const cantidadNum_Receta = parseFloat(cantidad) / this.dataNutrientes.cantidad_final;
            this.proteinas = Math.round(parseFloat(this.dataNutrientes.proteinas) * cantidadNum_Receta * 100) / 100 + '';
            this.grasas = Math.round(parseFloat(this.dataNutrientes.grasas) * cantidadNum_Receta * 100) / 100 + '';
            this.carbohidratos = Math.round(parseFloat(this.dataNutrientes.carbohidratos) * cantidadNum_Receta * 100) / 100 + '';
            this.azucares = Math.round(parseFloat(this.dataNutrientes.azucares) * cantidadNum_Receta * 100) / 100 + '';
         } else {
            const cantidadNum_Alimento = parseFloat(cantidad) / this.dataNutrientes.cantidad;
            this.proteinas = Math.round(parseFloat(this.dataNutrientes.proteinas) * cantidadNum_Alimento * 100) / 100 + '';
            this.grasas = Math.round(parseFloat(this.dataNutrientes.grasas) * cantidadNum_Alimento * 100) / 100 + '';
            this.carbohidratos = Math.round(parseFloat(this.dataNutrientes.carbohidratos) * cantidadNum_Alimento * 100) / 100 + '';
            this.azucares = Math.round(parseFloat(this.dataNutrientes.azucares) * cantidadNum_Alimento * 100) / 100 + '';
         }
      }
   }

   proponerAlimento() {
      // this.#dialog.closeAll();
      this.#dialog.open(SwitchProponerComidaComponent, {
         width: '40%',
         height: 'auto',
         maxHeight: '90vh',
      });
   }

   getIDUsuario(): any {
      return localStorage.getItem('idUsuarioLogeado');
   }
}
