import { Component, inject } from '@angular/core';
import { TablaComidasComponent } from '../tabla-comidas/tabla-comidas.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { FormConsumirComponent } from '../form-consumir/form-consumir.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SwitchProponerComidaComponent } from '../switch-proponer-comida/switch-proponer-comida.component';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
   selector: 'app-comidas-home',
   standalone: true,
   templateUrl: './comidas-home.component.html',
   styleUrl: './comidas-home.component.css',
   providers: [provideNativeDateAdapter()],
   imports: [MatInputModule, MatDatepickerModule, ReactiveFormsModule, TablaComidasComponent],
})
export class ComidasHomeComponent {
   #dialog: MatDialog = inject(MatDialog);
   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);

   fechaInicio: Date = new Date();
   fechaFin: Date = new Date();
   fechaInicioMostrar = '';
   fechaFinMostrar = '';

   rangoFechas = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
   });

   ngOnInit() {
      this.checkLogedIn();
      this.datePickerChange();
   }

   openDialog() {
      this.#dialog.open(FormConsumirComponent, {
         width: '70%',
         height: 'auto',
         maxHeight: '90vh',
      });
   }

   proponerComida() {
      this.#dialog.open(SwitchProponerComidaComponent, {
         width: '70%',
         height: 'auto',
         maxHeight: '90vh',
      });
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

   datePickerChange() {
      this.rangoFechas.valueChanges.subscribe((value) => {
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
   }
}
