import { Component, inject } from '@angular/core';
import { PesoService } from '../../../services/peso.service';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { FormEditarPesoComponent } from '../../pesos/form-editar-peso/form-editar-peso.component';
import { FormDeletePesoComponent } from '../../pesos/form-delete-peso/form-delete-peso.component';
import { FormAnadirPesoComponent } from '../../pesos/form-anadir-peso/form-anadir-peso.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ResponsiveInfoService } from '../../../services/responsive-info.service';
import { Subscription } from 'rxjs';

export interface Peso {
   fecha: string;
   hora: string;
   peso: number;
}

export interface PesoTabla {
   fechaHora: string;
   peso: number;
}

@Component({
   selector: 'app-tabla-pesos',
   standalone: true,
   imports: [
      MatTableModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatProgressSpinnerModule,
   ],
   templateUrl: './tabla-pesos.component.html',
   styleUrl: './tabla-pesos.component.css',
})
export class TablaPesosComponent {
   @ViewChild(MatSort) sort!: MatSort;

   #pesoService: PesoService = inject(PesoService);
   #dialog: MatDialog = inject(MatDialog);
   #responsiveInfoService: ResponsiveInfoService = inject(ResponsiveInfoService);

   newData: PesoTabla[] = [];

   displayedColumns: string[] = ['fechaHora', 'peso', 'acciones'];
   dataSource!: MatTableDataSource<PesoTabla>;

   idUsuario: string = localStorage.getItem('idUsuarioLogeado') ?? '';

   existeData: boolean = false;
   sinDatos: boolean = false;

   tamanoPantalla: string = 'pantalla';
   tamanoPantallaSub!: Subscription;
   widthEditarPeso: string = '70%';

   ngOnInit() {
      this.fetchData();
      this.obtenerUsuario();

      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
         if (this.tamanoPantalla === 'mediana') {
            this.widthEditarPeso = '70%';
         } else if (this.tamanoPantalla === 'pequena') {
            this.widthEditarPeso = '60%';
         }
      });
   }

   ngAfterViewInit() {
      const interval = setInterval(() => {
         if (this.existeData) {
            // Comprobamos si ya hay datos
            this.dataSource.sort = this.sort;
            // console.log("Ya existe data, configurado sort");
            clearInterval(interval); //Para parar el intervalo
         } else {
         }
      }, 500); //Tiempo del intervalo
   }

   fetchData() {
      //Actualizo los booleanos a valores por defecto
      this.existeData = false;
      this.sinDatos = false;

      const fecha = this.obtenerFecha();

      this.#pesoService.getAllPesos(this.idUsuario).subscribe((data: any) => {
         data.respuesta.forEach((respuesta: any) => {
            this.existeData = true;
            const horaCompleta = respuesta.hora.date.split(' ')[1];

            this.newData.push({
               fechaHora: respuesta.fecha.date.split(' ')[0] + ' / ' + horaCompleta.split('.')[0],
               peso: respuesta.peso,
            });

            this.dataSource = new MatTableDataSource(this.newData);
            this.dataSource.sort = this.sort;
            this.ngAfterViewInit();
         });
      });
   }

   obtenerFecha(): string {
      const date = new Date();
      return date.toISOString().split('T')[0];
   }

   anadirPeso() {
      console.log(this.widthEditarPeso);
      this.#dialog.open(FormAnadirPesoComponent, {
         width: this.widthEditarPeso,
      });
   }

   obtenerUsuario() {
      this.idUsuario = localStorage.getItem('idUsuarioLogeado') ?? '';
      console.log(this.idUsuario);
   }

   editPeso(peso: any) {
      const data = {
         peso: peso.peso,
         fecha: peso.fechaHora.split(' / ')[0],
         hora: peso.fechaHora.split(' / ')[1],
      };

      this.#dialog.open(FormEditarPesoComponent, {
         width: this.widthEditarPeso,
         data,
      });
   }

   deletePeso(peso: any) {
      const data = {
         peso: peso.peso,
         fecha: peso.fechaHora.split(' / ')[0],
         hora: peso.fechaHora.split(' / ')[1],
      };

      this.#dialog.open(FormDeletePesoComponent, {
         width: this.widthEditarPeso,
         data,
      });
   }
}
