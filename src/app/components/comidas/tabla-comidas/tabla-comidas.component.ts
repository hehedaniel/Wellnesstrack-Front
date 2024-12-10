import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AlimentosService } from '../../../services/alimentos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormEliminarConsumoDiarioComponent } from '../../comidas/form-eliminar-consumo-diario/form-eliminar-consumo-diario.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormEditarConsumoComponent } from '../../comidas/form-editar-consumo/form-editar-consumo.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { InfoComidaComponent } from '../../comidas/info-comida/info-comida.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

export interface Comida {
   Dia: string;
   Nombre: string;
   Hora: string;
   Calorias: number;
}

@Component({
   selector: 'app-tabla-comidas',
   standalone: true,
   imports: [MatTableModule, MatProgressSpinner, MatInputModule, MatDatepickerModule, ReactiveFormsModule, MatSortModule],
   providers: [provideNativeDateAdapter()],
   templateUrl: './tabla-comidas.component.html',
   styleUrl: './tabla-comidas.component.css',
})
export class TablaComidasComponent implements AfterViewInit {
   @ViewChild(MatSort) sort!: MatSort;

   #alimentoService: AlimentosService = inject(AlimentosService);
   #dialog: MatDialog = inject(MatDialog);
   #snacbkar: MatSnackBar = inject(MatSnackBar);

   existeData: boolean = false;
   sinDatos: boolean = false;

   displayedColumns: string[] = ['Dia', 'Hora', 'Nombre', 'Calorias', 'Acciones'];
   newData: Comida[] = []; // Para almacenar los datos que se van a mostrar en la tabla
   dataSource = new MatTableDataSource<Comida>(this.newData);

   fechaInicio: Date = new Date();
   fechaFin: Date = new Date();
   fechaInicioMostrar = '';
   fechaFinMostrar = '';

   rangoFechas = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
   });

   ngOnInit() {
      this.fetchData();
   }

   ngAfterViewInit() {
      const interval = setInterval(() => {
         if (this.existeData) {
            this.dataSource.sort = this.sort;
            clearInterval(interval);
         } else {
         }
      }, 500);
   }

   fetchData() {
      // Configuración del cambio en el rango de fechas
      this.rangoFechas.valueChanges.subscribe((value) => {
         if (value.start && value.end) {
            this.fechaInicio = new Date(value.start.toISOString().split('T')[0]);
            this.fechaInicio.setDate(this.fechaInicio.getDate() + 1);
            this.fechaFin = new Date(value.end.toISOString().split('T')[0]);
            this.fechaFin.setDate(this.fechaFin.getDate() + 1);

            localStorage.setItem('fechaInicioHome', this.fechaInicio.toISOString());
            localStorage.setItem('fechaFinHome', this.fechaFin.toISOString());
            this.fetchData(); // Recarga la tabla en lugar de toda la página
         }
      });

      // Obtención del rango de fechas desde `localStorage`
      const fechaFin = localStorage.getItem('fechaFinHome') ? new Date(localStorage.getItem('fechaFinHome') || '') : new Date();
      const fechaInicio = localStorage.getItem('fechaInicioHome')
         ? new Date(localStorage.getItem('fechaInicioHome') || '')
         : new Date(new Date().setDate(new Date().getDate() - 30));

      // Llamada al servicio para obtener los datos
      this.#alimentoService.getConsumoDiario(localStorage.getItem('idUsuarioLogeado'), fechaInicio, fechaFin).subscribe((data: any) => {
         if (data.respuesta === 'No se encontraron entradas en las fechas indicadas.') {
            console.log('No se encontraron entradas en las fechas indicadas.');
            this.sinDatos = true;
            return;
         }

         this.existeData = true;
         this.newData = data.respuesta
            .filter((respuesta: any) => respuesta.id !== undefined)
            .map((respuesta: any) => {
               const horaCompleta = respuesta.hora.date.split(' ')[1];
               const fecha = respuesta.fecha.date.split(' ')[0];
               return {
                  Dia: fecha,
                  Nombre: respuesta.comida,
                  Hora: horaCompleta.split('.')[0],
                  Calorias: respuesta.nutrientes.calorias,
               };
            });

         // Asignación de datos y sort a `dataSource`
         this.dataSource = new MatTableDataSource(this.newData);
         this.dataSource.sort = this.sort; // Asegura que `MatSort` esté asignado correctamente
      });
   }

   obtenerFecha(): string {
      const date = new Date();
      return date.toISOString().split('T')[0];
   }

   eliminarComida(comida: any) {
      console.log(comida);

      const idUsuario = localStorage.getItem('idUsuarioLogeado') || '';
      if (idUsuario === '') {
         console.log('No se ha podido obtener el id del usuario');
         return;
      }

      this.#dialog.open(FormEliminarConsumoDiarioComponent, {
         width: '70%',
         data: {
            nombre: comida.Nombre,
            hora: comida.Hora,
            calorias: comida.Calorias,
            fecha: comida.Dia,
         },
      });
   }

   editarComida(comida: any) {
      this.#dialog.open(FormEditarConsumoComponent, {
         width: '70%',
         height: '90%',
         data: {
            nombre: comida.Nombre,
            hora: comida.Hora,
            calorias: comida.Calorias,
            fecha: comida.Dia,
         },
      });
   }

   mostrarInfoComida(comida: any, event: MouseEvent) {
      event.preventDefault();
      this.#dialog.open(InfoComidaComponent, {
         width: '80%',
         data: {
            comida: comida,
         },
      });
   }
}
