import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class ResponsiveInfoService {
   private tamanoPantallaSubject: BehaviorSubject<string> = new BehaviorSubject<string>('pantalla');

   tamanoPantalla$ = this.tamanoPantallaSubject.asObservable();

   constructor() {
      this.calcularTamanoPantalla();
      window.addEventListener('resize', () => this.calcularTamanoPantalla());
   }

   private calcularTamanoPantalla() {
      const ancho = window.innerWidth;
      // console.log(ancho);
      if (ancho <= 576) {
         this.tamanoPantallaSubject.next('pequena');
      } else if (ancho <= 768) {
         this.tamanoPantallaSubject.next('mediana');
      } else {
         this.tamanoPantallaSubject.next('grande');
      }
   }
}
