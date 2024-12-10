import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ResumenAlimentosComponent } from '../../comidas/resumen-alimentos/resumen-alimentos.component';
import { TabsComidaEjercicioComponent } from '../tabs-comida-ejercicio/tabs-comida-ejercicio.component';

@Component({
   selector: 'app-home',
   standalone: true,
   templateUrl: './home.component.html',
   styleUrl: './home.component.css',
   imports: [ResumenAlimentosComponent, TabsComidaEjercicioComponent],
})
export class HomeComponent {
   #authService: AuthService = inject(AuthService);

   correo!: string;

   ngOnInit() {
      this.#authService.fbUserEmail().then((email) => {
         this.correo = email;
      });
   }
}
