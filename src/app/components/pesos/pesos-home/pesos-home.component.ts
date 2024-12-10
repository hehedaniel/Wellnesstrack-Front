import { Component } from '@angular/core';
import { TablaPesosComponent } from '../../pesos/tabla-pesos/tabla-pesos.component';
import { PesoGraficaComponent } from '../peso-grafica/peso-grafica.component';

@Component({
   selector: 'app-pesos-home',
   standalone: true,
   templateUrl: './pesos-home.component.html',
   styleUrl: './pesos-home.component.css',
   imports: [TablaPesosComponent, PesoGraficaComponent],
})
export class PesosHomeComponent {}
