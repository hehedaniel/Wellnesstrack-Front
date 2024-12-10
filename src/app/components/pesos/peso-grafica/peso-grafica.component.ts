import { Component, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PesoService } from '../../../services/peso.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
   selector: 'app-peso-grafica',
   standalone: true,
   providers: [provideNativeDateAdapter()],
   imports: [ChartModule, MatProgressSpinnerModule, MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
   templateUrl: './peso-grafica.component.html',
   styleUrl: './peso-grafica.component.css',
})
export class PesoGraficaComponent {
   #pesoService: PesoService = inject(PesoService);

   // FechaInicio como la fecha actual menos 30 dias
   fechaInicio: Date = new Date(new Date().setDate(new Date().getDate() - 30));
   // FechaFin como la fecha actual
   fechaFin: Date = new Date();
   idUsuario: string = '';

   documentStyle: any;
   textColor: any;
   textColorSecondary: any;
   surfaceBorder: any;
   options: any;
   data = {
      labels: [''],
      datasets: [
         {
            label: 'Peso (kg)',
            data: [],
            fill: false,
            borderColor: 'green',
            tension: 0.4,
         },
         {
            label: 'IMC (kg/m²)',
            data: [],
            fill: false,
            borderColor: 'blue',
            tension: 0.4,
         },
      ],
   };

   range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
   });

   existeData: boolean = false;
   sinDatos: boolean = false;

   spinnerColor: string = 'white';

   ngOnInit() {
      this.obtenerUsuario();
      this.fetchData();
   }

   fetchData() {
      const fechaInicioExtra = localStorage.getItem('fechaInicio');

      if (fechaInicioExtra != null && fechaInicioExtra != undefined && fechaInicioExtra != '' && !isNaN(Date.parse(fechaInicioExtra))) {
         this.fechaInicio = new Date(fechaInicioExtra);
      } else {
         this.fechaInicio = new Date(new Date().setDate(new Date().getDate() - 30));
      }

      const fechaFinExtra = localStorage.getItem('fechaFin');

      if (fechaFinExtra != null && fechaFinExtra != undefined && fechaFinExtra != '' && !isNaN(Date.parse(fechaFinExtra))) {
         this.fechaFin = new Date(fechaFinExtra);
      } else {
         this.fechaFin = new Date();
      }

      this.range.valueChanges.subscribe((value) => {
         if (value.start != null && value.end != null) {
            this.fechaInicio = new Date(value.start.toISOString().split('T')[0]);
            this.fechaFin = new Date(value.end.toISOString().split('T')[0]);

            localStorage.setItem('fechaInicio', this.fechaInicio.toISOString());
            localStorage.setItem('fechaFin', this.fechaFin.toISOString());

            window.location.reload();
         }
      });

      this.documentStyle = getComputedStyle(document.documentElement);
      this.textColor = this.documentStyle.getPropertyValue('--text-color');
      this.textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
      this.surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

      this.data = this.obtenerPesos();

      this.options = {
         maintainAspectRatio: false,
         aspectRatio: 1.2,
         plugins: {
            legend: {
               labels: {
                  color: this.textColor,
               },
            },
         },
         scales: {
            x: {
               ticks: {
                  color: 'black',
               },
               grid: {
                  color: this.surfaceBorder,
                  drawBorder: false,
               },
            },
            y: {
               ticks: {
                  color: 'black',
               },
               grid: {
                  color: this.surfaceBorder,
                  drawBorder: false,
               },
            },
         },
      };
   }

   obtenerPesos(): any {
      const newData = {
         labels: ([] = [0]),
         datasets: [
            {
               label: 'Pesos (kg)',
               data: ([] = [0]),
               fill: false,
               borderColor: '#089984',
               tension: 0.4,
               spanGaps: true,
            },
            {
               label: 'IMC (kg/m²)',
               data: ([] = [0]),
               fill: false,
               borderColor: '#1EB6F2',
               tension: 0.4,
               spanGaps: true,
            },
         ],
      };
      //Se realizada una petición para obtener los pesos del usuario entre dos fechas
      this.#pesoService.getPesos(this.idUsuario, this.fechaInicio, this.fechaFin).subscribe((data: any) => {
         if (data.respuesta == 'No se encontraron pesos en las fechas indicadas.') {
            console.log('Sin pesos');
            this.sinDatos = true;
         } else {
            newData.datasets[0].data.pop();
            newData.datasets[1].data.pop();
            newData.labels.pop();
            console.log(data.respuesta);

            //Bucle que recorre los pesos obtenidos y los añade al gráfico
            data.respuesta.forEach((peso: any) => {
               const pesoAdd = peso.peso;
               const imcAdd = peso.IMC;
               console.log(peso.IMC);

               newData.datasets[0].data.push(pesoAdd);
               newData.datasets[1].data.push(imcAdd);
               newData.labels.push(peso.fecha.date.split(' ')[0]);
            });
            this.existeData = true;
         }
      });

      return newData;
   }

   obtenerUsuario() {
      this.idUsuario = localStorage.getItem('idUsuarioLogeado') ?? '';
      console.log(this.idUsuario);
   }
}
