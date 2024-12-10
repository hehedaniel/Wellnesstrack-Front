import { Component, Host, HostListener, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AlimentosService } from '../../../services/alimentos.service';
import { EjerciciosRealizadosService } from '../../../services/ejercicios.service';

// import { BadgeModule } from 'primeng/badge';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIcon } from '@angular/material/icon';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { ResponsiveInfoService } from '../../../services/responsive-info.service';

@Component({
   selector: 'app-toolbar',
   standalone: true,
   imports: [MatToolbarModule, RouterModule, MatIcon, MatBadgeModule, MatButtonModule, MatMenuModule],
   templateUrl: './toolbar.component.html',
   styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
   #usuarioService: UsuarioService = inject(UsuarioService);
   #alimentoService: AlimentosService = inject(AlimentosService);
   #ejercicioService: EjerciciosRealizadosService = inject(EjerciciosRealizadosService);
   #responsiveInfoService: ResponsiveInfoService = inject(ResponsiveInfoService);

   esAdmin: boolean = false;

   nombre: string = '';

   idUsuario: string = localStorage.getItem('idUsuarioLogeado') ?? '';

   nBadge: number = 0;

   // Para el responsive
   private tamanoPantallaSub!: Subscription;
   tamanoPantalla: string = 'pantalla';

   ngOnInit() {
      this.nombre = localStorage.getItem('nombreUsuario') ?? '';
      this.comprobarRol();
      this.comprobarNumeroPropuestas();

      this.tamanoPantallaSub = this.#responsiveInfoService.tamanoPantalla$.subscribe((size) => {
         this.tamanoPantalla = size;
         console.log(this.tamanoPantalla);
      });
   }

   comprobarRol() {
      // Hago la peticion para saber si el usuario es admin o no
      this.#usuarioService.getUsuarioAdmin(this.idUsuario).subscribe((data: any) => {
         this.esAdmin = data.respuesta;
      });
   }

   comprobarNumeroPropuestas() {
      this.#alimentoService.getRecetasAdministrar().subscribe((data: any) => {
         data.respuesta
            .filter((respuesta: any) => respuesta.id !== undefined)
            .map((receta: any) => {
               this.nBadge++;
            });
      });
      this.#ejercicioService.getEjerciciosAdministrar().subscribe((data: any) => {
         data.respuesta
            .filter((respuesta: any) => respuesta.id !== undefined)
            .map((receta: any) => {
               this.nBadge++;
            });
      });
      this.#alimentoService.getAlimentosAdministrar().subscribe((data: any) => {
         data.respuesta
            .filter((respuesta: any) => respuesta.id !== undefined)
            .map((receta: any) => {
               this.nBadge++;
            });
      });
   }
}
