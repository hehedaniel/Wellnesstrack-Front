import { Component, inject } from '@angular/core';

import { ChartModule } from 'primeng/chart';
import { AlimentosService } from '../../../services/alimentos.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResponsiveInfoService } from '../../../services/responsive-info.service';

@Component({
   selector: 'app-resumen-alimentos',
   standalone: true,
   providers: [provideNativeDateAdapter()],
   imports: [ChartModule, NgxChartsModule, MatDatepickerModule, MatFormFieldModule, MatProgressSpinnerModule, FormsModule, ReactiveFormsModule],
   templateUrl: './resumen-alimentos.component.html',
   styleUrl: './resumen-alimentos.component.css',
})
export class ResumenAlimentosComponent {
   options: any;

   $fecha: string = '';

   #alimentoService: AlimentosService = inject(AlimentosService);
   #responsiveInfoService: ResponsiveInfoService = inject(ResponsiveInfoService);

   view: [] = [];

   // options
   gradient: boolean = true;
   showLegend: boolean = true;
   showLabels: boolean = true;
   legendPosition: string = 'below';
   colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
   };

   single: any[] = [];

   datos: boolean = false;

   // FechaInicio como la fecha actual menos 30 dias
   fechaInicio: Date = new Date(new Date().setDate(new Date().getDate() - 30));
   // FechaFin como la fecha actual
   fechaFin: Date = new Date();

   fechaInicioMostrar = '';
   fechaFinMostrar = '';

   rangeoFechas = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
   });

   // Para el responsive
   private tamanoPantallaSub!: Subscription;
   tamanoPantalla: string = 'pantalla';

   ngOnInit() {
      if (this.checkLogin() && localStorage.getItem('idUsuarioLogeado') !== null) {
         this.fetchData();
         Object.assign(this, this.single);
      } else {
      }

      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
         //  console.log(this.tamanoPantalla);
         if (this.tamanoPantalla === 'grande') {
            // this.view = [450, 250];
         } else {
            // this.view = [350, 180];
         }
      });
   }

   fetchData(): any {
      this.rangeoFechas.valueChanges.subscribe((value) => {
         if (value.start != null && value.end != null) {
            this.fechaInicio = new Date(value.start.toISOString().split('T')[0]);
            this.fechaInicio.setDate(this.fechaInicio.getDate() + 1);
            this.fechaFin = new Date(value.end.toISOString().split('T')[0]);
            this.fechaFin.setDate(this.fechaFin.getDate() + 1);

            localStorage.setItem('fechaInicioHome', this.fechaInicio.toISOString());
            localStorage.setItem('fechaFinHome', this.fechaFin.toISOString());

            console.log('Fecha inicio: ' + this.fechaInicio.toISOString());
            console.log('Fecha fin: ' + this.fechaFin.toISOString());

            window.location.reload();
         }
      });

      this.fechaFin = localStorage.getItem('fechaFinHome') ? new Date(localStorage.getItem('fechaFinHome') || '') : new Date();
      this.fechaInicio = localStorage.getItem('fechaInicioHome')
         ? new Date(localStorage.getItem('fechaInicioHome') || '')
         : new Date(new Date().setDate(new Date().getDate() - 30));

      this.fechaInicioMostrar = this.fechaInicio.toISOString().split('T')[0];
      this.fechaFinMostrar = this.fechaFin.toISOString().split('T')[0];

      console.log(localStorage.getItem('fechaInicioHome'));

      const newData = [
         { name: 'Azúcares', value: 0 },
         { name: 'Carbohidratos', value: 0 },
         { name: 'Grasas', value: 0 },
         { name: 'Calorías', value: 0 },
         { name: 'Proteínas', value: 0 },
         // { name: 'Vitaminas', value: 0 }
      ];

      this.#alimentoService.getConsumoDiario(localStorage.getItem('idUsuarioLogeado'), this.fechaInicio, this.fechaFin).subscribe((data: any) => {
         console.log(data);

         if (data.respuesta === 'No se encontraron entradas en las fechas indicadas.') {
            this.datos = false;
            console.log('No se encontraron entradas en las fechas indicadas.');
         } else {
            this.datos = true;
            data.respuesta
               .filter((respuesta: any) => respuesta.id !== undefined)
               .forEach((respuesta: any) => {
                  // console.log(typeof newData[0].value);
                  newData[0].value = parseFloat((newData[0].value + parseFloat(respuesta.nutrientes.azucares)).toFixed(2));
                  newData[1].value = parseFloat((newData[1].value + parseFloat(respuesta.nutrientes.carbohidratos)).toFixed(2));
                  newData[2].value = parseFloat((newData[2].value + parseFloat(respuesta.nutrientes.grasas)).toFixed(2));
                  newData[3].value = parseFloat((newData[3].value + parseFloat(respuesta.nutrientes.calorias)).toFixed(2));
                  newData[4].value = parseFloat((newData[4].value + parseFloat(respuesta.nutrientes.proteinas)).toFixed(2));
                  // newData[5].value = parseFloat((newData[5].value + parseFloat(respuesta.nutrientes.vitaminas)).toFixed(2));
               });

            this.single = newData;
         }
      });
   }

   onSelect(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
   }

   onActivate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
   }

   onDeactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
   }

   checkLogin(): boolean {
      // Se comprueba que exista en localStorage el valor del id del usuario
      if (localStorage.getItem('idUsuarioLogeado') === null) {
         console.log('Sin logearse');
         return false;
      } else {
         console.log('Logeado');
         return true;
      }
   }
}
