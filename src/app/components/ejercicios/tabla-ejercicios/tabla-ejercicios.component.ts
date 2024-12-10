import { Component, inject } from '@angular/core';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormEditarEjercicioRealizadoComponent } from '../form-editar-ejercicio-realizado/form-editar-ejercicio-realizado.component';
import { FormEliminarEjercicioRealizadoComponent } from '../form-eliminar-ejercicio-realizado/form-eliminar-ejercicio-realizado.component';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfoEjercicioComponent } from '../info-ejercicio/info-ejercicio.component';
import { FlexLayoutModule } from '@angular/flex-layout';

export interface Ejercicio {
   dia: string;
   hora: string;
   nombre: string;
   tiempo: string;
   calorias: number;
}

@Component({
   selector: 'app-tabla-ejercicios',
   standalone: true,
   imports: [
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatDatepickerModule,
      MatProgressSpinnerModule,
      FlexLayoutModule,
   ],

   providers: [provideNativeDateAdapter()],
   templateUrl: './tabla-ejercicios.component.html',
   styleUrl: './tabla-ejercicios.component.css',
})
export class TablaEjerciciosComponent implements AfterViewInit {
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

   #ejRealizadosService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);
   #dialog: MatDialog = inject(MatDialog);

   //existeData es un booleano para saber cuando se esta haciendo la comprobacion de si hay datos o no
   existeData: boolean = false;
   //sinDatos es un booleano para saber si no hay datos
   sinDatos: boolean = false;

   fechaSeleccionada: string = '';

   displayedColumns: string[] = ['dia', 'hora', 'nombre', 'tiempo', 'calorias', 'acciones'];
   newData: Ejercicio[] = []; //Para almacenar los datos que se van a mostrar en la tabla
   dataSource!: MatTableDataSource<Ejercicio>;

   ngOnInit() {
      this.fetchData();
   }

   ngAfterViewInit() {
      const interval = setInterval(() => {
         if (this.existeData) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            clearInterval(interval);
         } else {
         }
      }, 500);
   }

   fetchData(): void {
      //Actualizo los booleanos a valores por defecto
      this.existeData = false;
      this.sinDatos = false;

      const fechaFin = (localStorage.getItem('fechaFinHome') ? new Date(localStorage.getItem('fechaFinHome') || '') : new Date())
         .toISOString()
         .split('T')[0];
      const fechaInicio = (
         localStorage.getItem('fechaInicioHome')
            ? new Date(localStorage.getItem('fechaInicioHome') || '')
            : new Date(new Date().setDate(new Date().getDate() - 30))
      )
         .toISOString()
         .split('T')[0];

      this.#ejRealizadosService
         .postEjercicioRealizadosRango(localStorage.getItem('idUsuarioLogeado'), fechaInicio, fechaFin)
         .subscribe((data: any) => {
            if (data.respuesta === 'No se han encontrado ejercicios realizados por el usuario en el rango de fechas indicado') {
               console.log('No se encontraron ejercicios realizados.');
               this.sinDatos = true;
               return;
            } else {
               this.existeData = true;

               this.newData = data.respuesta.map((respuesta: any) => ({
                  nombre: respuesta.ejNombre,
                  hora: respuesta.hora.date.split(' ')[1].split('.')[0],
                  tiempo: respuesta.tiempo,
                  calorias: respuesta.calorias,
                  dia: respuesta.fecha.date.split(' ')[0],
               }));
               this.dataSource = new MatTableDataSource(this.newData); // Actualiza dataSource
               this.dataSource.sort = this.sort;
               this.ngAfterViewInit();
            }
         });
   }

   obtenerFecha(): string {
      const date = new Date();
      return date.toISOString().split('T')[0];
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   eliminarEjercicio(ejercicio: any) {
      const dialogData = {
         tiempo: ejercicio.tiempo,
         calorias: ejercicio.calorias,
         hora: ejercicio.hora,
         nombre: ejercicio.nombre,
         fecha: ejercicio.dia,
      };
      this.#dialog.open(FormEliminarEjercicioRealizadoComponent, {
         data: {
            dialogData,
         },
         width: '70%',
         height: 'auto',
         maxHeight: '95vh',
      });
   }

   editarEjercicio(ejercicio: any) {
      const dialogData = {
         tiempo: ejercicio.tiempo,
         calorias: ejercicio.calorias,
         hora: ejercicio.hora,
         nombre: ejercicio.nombre,
         fecha: ejercicio.dia,
      };
      this.#dialog.open(FormEditarEjercicioRealizadoComponent, {
         data: {
            dialogData,
         },
         width: '80%',
         height: 'auto',
         maxHeight: '95vh', // Para evitar que el diálogo se expanda demasiado verticalmente
      });
   }

   mostrarInfoEjercicio(ejercicio: any, event: MouseEvent) {
      event.preventDefault();
      this.#dialog.open(InfoEjercicioComponent, {
         width: '80%',
         data: {
            ejercicio: ejercicio,
         },
      });
   }
}
