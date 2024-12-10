import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegistroComponent } from '../../usuario/registro/registro.component';
import { LoginComponent } from '../../usuario/login/login.component';
import { TablaComidasComponent } from '../../comidas/tabla-comidas/tabla-comidas.component';
import { TablaEjerciciosComponent } from '../../ejercicios/tabla-ejercicios/tabla-ejercicios.component';
import { TabViewModule } from 'primeng/tabview';

@Component({
   selector: 'app-tabs-comida-ejercicio',
   standalone: true,
   templateUrl: './tabs-comida-ejercicio.component.html',
   styleUrl: './tabs-comida-ejercicio.component.css',
   imports: [
      MatTabsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      TablaComidasComponent,
      TablaEjerciciosComponent,
      TabViewModule,
   ],
})
export class TabsComidaEjercicioComponent {
   activeTab: string = 'Iniciar sesión';
}
