import { Component, inject } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';

@Component({
   selector: 'app-formulario-tabs',
   standalone: true,
   templateUrl: './formulario-tabs.component.html',
   styleUrl: './formulario-tabs.component.css',
   imports: [MatTabsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, LoginComponent, RegistroComponent],
})
export class FormularioTabsComponent {
   activeTab: string = 'Iniciar sesión';

   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);

   formularioRegistro: FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required]),
      contrasenarepeat: new FormControl('', [Validators.required]),
   });

   formularioLogin: FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required]),
   });

   hide = true;

   loggedIn: boolean = false; // Variable para saber si el usuario esta logeado

   ngOnInit() {
      this.#authService.fbUserEmail().then((email) => {
         if (email !== null) {
            console.log('Usuario logeado, redirigiendo a perfil');
            this.loggedIn = true;
            this.#router.navigate(['/perfil']);
         } else {
            console.log('Usuario no logeado');
         }
      });
   }

   registrarUsuario() {
      console.log(this.formularioRegistro.value);

      //Guardar los datos del formulario en localStorage
      localStorage.setItem('correo', this.formularioRegistro.value.correo);
      localStorage.setItem('contrasena', this.formularioRegistro.value.contrasena);
      this.#router.navigate(['/registrodatos']);
   }
}
