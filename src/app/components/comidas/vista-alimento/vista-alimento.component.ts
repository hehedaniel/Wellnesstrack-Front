import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlimentosService } from '../../../services/alimentos.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
   selector: 'app-vista-alimento',
   standalone: true,
   imports: [MatProgressSpinnerModule],
   templateUrl: './vista-alimento.component.html',
   styleUrl: './vista-alimento.component.css',
})
export class VistaAlimentoComponent {
   #router: Router = inject(Router);
   #alimentosService: AlimentosService = inject(AlimentosService);

   alimentoNombre: string = '';
   alimentoMarca: string = '';
   alimentoCantidad: string = '';
   alimentoCalorias: string = '';
   alimentoGrasas: string = '';
   alimentoCarbohidratos: string = '';
   alimentoProteinas: string = '';
   alimentoAzucar: string = '';
   alimentoVitaminas: string = '';
   alimentoImg: string = '';
   alimentoDescripcion: string = '';
   alimentoID: string = '';

   ngOnInit() {
      const url = this.#router.url.split('/');
      this.alimentoID = url[url.length - 1];
      // Buscar alimento por id
      this.getAlimento(this.alimentoID);
   }

   getAlimento(id: string) {
      this.#alimentosService.getAlimento(id).subscribe((alimento: any) => {
         console.log(alimento.respuesta);
         this.alimentoNombre = alimento.respuesta.nombre;
         this.alimentoMarca = alimento.respuesta.marca;
         this.alimentoCantidad = alimento.respuesta.cantidad;
         this.alimentoCalorias = alimento.respuesta.calorias;
         this.alimentoGrasas = alimento.respuesta.grasas;
         this.alimentoCarbohidratos = alimento.respuesta.carbohidratos;
         this.alimentoProteinas = alimento.respuesta.proteinas;
         this.alimentoAzucar = alimento.respuesta.azucares;
         this.alimentoVitaminas = alimento.respuesta.vitaminas;
         this.alimentoImg = alimento.respuesta.imagen;
         this.alimentoDescripcion = alimento.respuesta.descripcion;
      });
   }

   salir() {
      this.#router.navigate(['/alimentos']);
   }
}
