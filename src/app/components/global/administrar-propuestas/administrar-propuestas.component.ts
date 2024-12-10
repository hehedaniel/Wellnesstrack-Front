import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';
import { FormAdministrarEjercicioPropuestoComponent } from '../../ejercicios/form-administrar-ejercicio-propuesto/form-administrar-ejercicio-propuesto.component';
import { UsuarioService } from '../../../services/usuario.service';
import { AccordionModule } from 'primeng/accordion';
import { AlimentosService } from '../../../services/alimentos.service';
import { FormAdministrarRecetaPropuestaComponent } from '../../comidas/form-administrar-receta-propuesta/form-administrar-receta-propuesta.component';
import { FormAdministrarAlimentoPropuestoComponent } from '../../comidas/form-administrar-alimento-propuesto/form-administrar-alimento-propuesto.component';
import { MatBadgeModule } from '@angular/material/badge';
import { SpinnerMostrarComponent } from '../../global/spinner-mostrar/spinner-mostrar.component';
import { provideNativeDateAdapter } from '@angular/material/core';

export interface EjercicioAdministrar {
   id: number;
   nombre: string;
   descripcion: string;
   grupoMuscular: string;
   dificultad: string;
   instrucciones: string;
   valorMET: number;
   idUsuario: number;
}

export interface ComidaAdministrar {
   id: number;
   nombre: string;
   descripcion: string;
   marca: string;
   cantidad: string;
   proteinas: string;
   grasas: string;
   carbohidratos: string;
   azucares: string;
   vitaminas: string;
   calorias: string;
   imagen: string;
   idUsuario: number;
}

export interface RecetaAdministrar {
   id: number;
   nombre: string;
   descripcion: string;
   instrucciones: string;
   cantidad: string;
   proteinas: string;
   grasas: string;
   carbohidratos: string;
   azucares: string;
   vitaminas: string;
   calorias: string;
   imagen: string;
   idUsuario: number;
}

@Component({
   selector: 'app-administrar-ejercicios-propuestos',
   standalone: true,
   imports: [
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatProgressSpinnerModule,
      AccordionModule,
      MatBadgeModule,
   ],
   providers: [provideNativeDateAdapter()],
   templateUrl: './administrar-propuestas.component.html',
   styleUrl: './administrar-propuestas.component.css',
})
export class AdministrarEjerciciosPropuestosComponent {
   ruta = 'http://localhost:8000';
   #dialog: MatDialog = inject(MatDialog);
   #authService: AuthService = inject(AuthService);
   #usuarioService: UsuarioService = inject(UsuarioService);
   #router: Router = inject(Router);
   #ejRealizadosService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);
   #alimentosService: AlimentosService = inject(AlimentosService);

   existeData: boolean = false;

   //Para saber cuando se ha verificado que el usuario esta logeado
   usuarioCorrecto: boolean = false;

   //existeData es un booleano para saber cuando se esta haciendo la comprobacion de si hay datos o no
   existeDataEjercicio: boolean = false;
   //sinDatos es un booleano para saber si no hay datos
   sinDatosEjercicio: boolean = false;

   displayedColumnsEjercicio: string[] = ['id', 'idUsuario', 'nombre', 'acciones'];
   dataSourceEjercicio!: MatTableDataSource<EjercicioAdministrar>;
   newDataEjercicio: EjercicioAdministrar[] = [];
   nBadgeEjercicio: number = 0;

   //existeData es un booleano para saber cuando se esta haciendo la comprobacion de si hay datos o no
   existeDataComida: boolean = false;
   //sinDatos es un booleano para saber si no hay datos
   sinDatosComida: boolean = false;

   displayedColumnsComida: string[] = ['id', 'idUsuario', 'nombre', 'acciones'];
   dataSourceComida!: MatTableDataSource<ComidaAdministrar>;
   newDataComida: ComidaAdministrar[] = [];
   nBadgeComida: number = 0;

   //existeData es un booleano para saber cuando se esta haciendo la comprobacion de si hay datos o no
   existeDataReceta: boolean = false;
   //sinDatos es un booleano para saber si no hay datos
   sinDatosReceta: boolean = false;
   nBadgeReceta: number = 0;

   displayedColumnsReceta: string[] = ['id', 'idUsuario', 'nombre', 'acciones'];
   dataSourceReceta!: MatTableDataSource<RecetaAdministrar>;
   newDataReceta: RecetaAdministrar[] = [];

   // Para saber que acordeon tiene mas propuestas y mostrarlo
   acordeonMostar: number[] = [0, 0]; // 0 = ejercicio, 1 = comida, 2 = receta - numero de propuestas

   ngOnInit() {
      this.checkLogedIn();
      //Timer que comprueba si el usuario esta logeado
      const interval = setInterval(() => {
         if (this.usuarioCorrecto) {
            clearInterval(interval);
            this.obtenerEjerciciosAdministrar();
            this.obtenerComidasAdministrar();
            this.obtenerRecetasAdministrar();
         }
      }, 500);
   }

   fetchData(): void {
      this.obtenerEjerciciosAdministrar();
      this.obtenerComidasAdministrar();
      this.obtenerRecetasAdministrar();
   }

   // ---------------------- Funciones de ejercicio

   administrarEjercicio(ejercicio: EjercicioAdministrar) {
      const dialogRef = this.#dialog.open(FormAdministrarEjercicioPropuestoComponent, {
         width: '80%',
         data: ejercicio,
      });

      dialogRef.afterClosed().subscribe((result) => {
         if (result === 'administrado') {
            console.log('Ejercicio administrado');
            this.fetchData();
         } else if (result === 'postpuesto') {
            console.log('Sin accion realizada');
         }
      });
   }

   obtenerEjerciciosAdministrar() {
      //Actualizo los booleanos a valores por defecto
      this.existeDataEjercicio = false;
      this.sinDatosEjercicio = false;

      this.#ejRealizadosService.getEjerciciosAdministrar().subscribe((data: any) => {
         if (data.respuesta === 'No hay ejercicios por administrar' || (data.respuesta.length === 1 && data.respuesta[0].headers)) {
            console.log('No se encontraron ejercicios realizados.');
            this.sinDatosEjercicio = true;
            return;
         } else {
            this.existeDataEjercicio = true;

            this.newDataEjercicio = data.respuesta
               .filter((respuesta: any) => respuesta.id !== undefined)
               .map((respuesta: any) => ({
                  id: respuesta.id,
                  idUsuario: respuesta.idUsuario,
                  nombre: respuesta.nombre,
                  descripcion: respuesta.descripcion,
                  grupoMuscular: respuesta.grupoMuscular,
                  dificultad: respuesta.dificultad,
                  instrucciones: respuesta.instrucciones,
                  valorMET: respuesta.valorMET,
                  enlaces: respuesta.enlaces,
               }));
            //  console.log(this.newData);
            this.dataSourceEjercicio = new MatTableDataSource(this.newDataEjercicio); // Actualiza dataSource
            this.existeData = true;
            //Compruebo cuantos ejercicios se han recibido
            this.nBadgeEjercicio = this.newDataEjercicio.length;
            if (this.acordeonMostar[1] < this.nBadgeEjercicio) {
               this.acordeonMostar[0] = 0;
               this.acordeonMostar[1] = this.nBadgeEjercicio;
            }
         }
      });
   }

   // ---------------------- Funciones de comida

   obtenerComidasAdministrar() {
      //Actualizo los booleanos a valores por defecto
      this.existeDataComida = false;
      this.sinDatosComida = false;

      this.#alimentosService.getAlimentosAdministrar().subscribe((data: any) => {
         if (data.respuesta === 'No hay alimentos para administrar' || (data.respuesta.length === 1 && data.respuesta[0].headers)) {
            console.log('No se encontraron alimentos para administrar.');
            this.sinDatosComida = true;
            return;
         } else {
            this.existeDataComida = true;
            // console.log(data.respuesta);

            this.newDataComida = data.respuesta
               .filter((respuesta: any) => respuesta.id !== undefined)
               .map((respuesta: any) => ({
                  id: respuesta.id,
                  idUsuario: respuesta.idUsuario,
                  nombre: respuesta.nombre,
                  descripcion: respuesta.descripcion,
                  marca: respuesta.marca,
                  cantidad: respuesta.cantidad,
                  proteinas: respuesta.proteinas,
                  grasas: respuesta.grasas,
                  carbohidratos: respuesta.carbohidratos,
                  azucares: respuesta.azucares,
                  vitaminas: respuesta.vitaminas,
                  calorias: respuesta.calorias,
                  imagen: respuesta.imagen,
               }));

            this.dataSourceComida = new MatTableDataSource(this.newDataComida); // Actualiza dataSource
            this.existeData = true;
            //Compruebo cuantos ejercicios se han recibido
            this.nBadgeComida = this.newDataComida.length;
            if (this.acordeonMostar[1] < this.nBadgeComida) {
               this.acordeonMostar[0] = 1;
               this.acordeonMostar[1] = this.nBadgeComida;
            }
         }
      });
   }

   administrarComida(comida: ComidaAdministrar) {
      console.log(comida);
      const dialogRef = this.#dialog.open(FormAdministrarAlimentoPropuestoComponent, {
         width: '80%',
         data: comida,
      });

      dialogRef.afterClosed().subscribe((result) => {
         // if (result === 'administrado') {
         //    console.log('Comida administrada');
         // } else if (result === 'postpuesto') {
         //    console.log('Sin accion realizada');
         // }
         this.fetchData();
      });
   }

   // ---------------------- Funciones de receta

   obtenerRecetasAdministrar() {
      this.existeData = true;
      //Actualizo los booleanos a valores por defecto
      this.existeDataReceta = false;
      this.sinDatosReceta = false;

      this.#alimentosService.getRecetasAdministrar().subscribe((data: any) => {
         if (data.respuesta === 'No hay recetas por administrar' || (data.respuesta.length === 1 && data.respuesta[0].headers)) {
            console.log('No se encontraron receta para administrar.');
            this.sinDatosReceta = true;
            return;
         } else {
            this.existeDataReceta = true;

            this.newDataReceta = data.respuesta
               .filter((respuesta: any) => respuesta.id !== undefined)
               .map((respuesta: any) => ({
                  id: respuesta.id,
                  idUsuario: respuesta.idUsuario,
                  nombre: respuesta.nombre,
                  descripcion: respuesta.descripcion,
                  instrucciones: respuesta.instrucciones,
                  cantidad: respuesta.cantidadFinal,
                  proteinas: respuesta.proteinas,
                  grasas: respuesta.grasas,
                  carbohidratos: respuesta.carbohidratos,
                  azucares: respuesta.azucares,
                  vitaminas: respuesta.vitaminas,
                  calorias: respuesta.calorias,
                  imagen: respuesta.imagen,
               }));
            this.dataSourceReceta = new MatTableDataSource(this.newDataReceta); // Actualiza dataSource
            this.existeData = true;
            //Compruebo cuantos ejercicios se han recibido
            this.nBadgeReceta = this.newDataReceta.length;
            console.log(this.acordeonMostar[1] < this.nBadgeReceta);
            if (this.acordeonMostar[1] < this.nBadgeReceta) {
               this.acordeonMostar[0] = 2;
               this.acordeonMostar[1] = this.nBadgeReceta;
            }
         }
      });
   }

   administrarReceta(receta: RecetaAdministrar) {
      const dialogRef = this.#dialog.open(FormAdministrarRecetaPropuestaComponent, {
         width: '80%',
         data: receta,
      });

      dialogRef.afterClosed().subscribe((result) => {
         if (result === 'administrado') {
            console.log('Receta administrada');
            this.fetchData();
         } else if (result === 'postpuesto') {
            console.log('Sin accion realizada');
         }
      });
   }

   // ---------------------- Funciones varias

   checkLogedIn() {
      this.#authService.fbUserEmail().then((email) => {
         if (email !== null) {
            //Obtengo el id desde localStorage
            const id = localStorage.getItem('idUsuarioLogeado');
            //Si no existe el id en localStorage, deniego el acceso
            if (id === null) {
               console.log('Usuario no logeado, fallo autenticación id');
               this.#router.navigate(['/login']);
            }
            this.#usuarioService.getRolUsuario(id).subscribe((data: any) => {
               if (data.respuesta === 'Usuario no encontrado') {
                  console.log('Usuario sin acceso, no encontrado');
                  this.#router.navigate(['/login']);
               } else {
                  if (data.respuesta.rol) {
                     // console.log(data.respuesta.rol);
                     this.usuarioCorrecto = true;
                  } else {
                     console.log('Usuario no logeado, fallo autenticación rol');
                     this.#router.navigate(['/login']);
                  }
               }
            });
         } else {
            console.log('Usuario no logeado, fallo autenticación email');
            this.#router.navigate(['/login']);
         }
      });
   }
}
