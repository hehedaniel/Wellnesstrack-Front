import { Component, inject, ViewChild } from '@angular/core';
import { TablaEjerciciosComponent } from '../tabla-ejercicios/tabla-ejercicios.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormRealizarEjercicioComponent } from '../form-realizar-ejercicio/form-realizar-ejercicio.component';
import { FormProponerEjercicioComponent } from '../form-proponer-ejercicio/form-proponer-ejercicio.component';

@Component({
   selector: 'app-ejercicios-home',
   standalone: true,
   imports: [TablaEjerciciosComponent, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
   providers: [provideNativeDateAdapter()],
   templateUrl: './ejercicios-home.component.html',
   styleUrls: ['./ejercicios-home.component.css'],
})
export class EjerciciosHomeComponent {
   @ViewChild(TablaEjerciciosComponent) tablaEjercicios!: TablaEjerciciosComponent;

   ruta = 'http://localhost:8000';
   #dialog: MatDialog = inject(MatDialog);
   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);
   #usuarioService: UsuarioService = inject(UsuarioService);

   fechaInicio: Date = new Date();
   fechaFin: Date = new Date();
   fechaInicioMostrar = '';
   fechaFinMostrar = '';

   rangeoFechas = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
   });

   ngOnInit() {
      this.checkLogedIn();
      this.cambiarTituloPagina();
   }

   cambiarTituloPagina() {
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

      const hoy = new Date().toISOString().slice(0, 10);
      if (this.fechaFin.toISOString().split('T')[0] === hoy) {
         this.fechaFinMostrar = 'hoy';
      } else {
         this.fechaFinMostrar = this.fechaFin.toISOString().split('T')[0];
      }

      console.log(localStorage.getItem('fechaInicioHome'));
   }

   checkLogedIn() {
      this.#authService.fbUserEmail().then((email) => {
         if (email !== null) {
            console.log('Usuario logeado');
         } else {
            console.log('Usuario no logeado');
            this.#router.navigate(['/login']);
         }
      });
   }

   openDialog() {
      this.#dialog.open(FormRealizarEjercicioComponent, {
         width: '70%',
         height: 'auto',
         maxHeight: '90vh', // Para evitar que el diálogo se expanda demasiado verticalmente
      });
   }

   openDialogProponer() {
      this.#dialog.open(FormProponerEjercicioComponent, {
         width: '90%',
         height: 'auto',
         maxHeight: '90vh',
      });
   }
}
