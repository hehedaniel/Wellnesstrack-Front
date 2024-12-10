import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
   selector: 'app-login',
   standalone: true,
   imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatLabel,
      MatFormField,
      MatInput,
      MatIcon,
      FormsModule,
      InputGroupModule,
      InputGroupAddonModule,
      InputTextModule,
      PasswordModule,
      MatCardModule,
      MatTabsModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      FormsModule,
      MatSnackBarModule,
   ],
   templateUrl: './login.component.html',
   styleUrl: './login.component.css',
})
export class LoginComponent {
   // Servicios del componente
   #authService: AuthService = inject(AuthService);
   #usuarioService: UsuarioService = inject(UsuarioService);
   #router: Router = inject(Router);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   // Variables del componente
   formularioLogin: FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required]),
   });

   hide = true;
   passwordVisible = false;
   mosrtarControles = false;

   loginUser() {
      if (this.validarLogin('correo') && this.validarLogin('contrasena')) {
         this.#authService.fbLogin(this.formularioLogin.value.correo, this.formularioLogin.value.contrasena).then((result) => {
            if (!result) {
               console.log('Usuario no logeado');
               this.#snackBar.open('No ha sido posible iniciar sesión, compruebe los datos introducidos', '', {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar'],
               });
            } else {
               console.log('Usuario logeado');
               this.#authService.fbUserEmail().then((email) => {
                  this.#usuarioService.getUser(email).subscribe((usuario: any) => {
                     if (usuario) {
                        console.log(usuario);
                        localStorage.setItem('idUsuarioLogeado', usuario.respuesta.id);
                        this.#router.navigate(['/perfil']);
                     } else {
                        this.#router.navigate(['/registro']);
                        this.#snackBar.open('No se ha encontrado el usuario, registrese', '', {
                           duration: 2000,
                           horizontalPosition: 'center',
                           verticalPosition: 'top',
                           panelClass: ['error-snackbar'],
                        });
                     }
                  });
               });
               this.#router.navigate(['/home']);
            }
         });
      } else {
         this.#snackBar.open('Rellene el formulario correctamente', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      }
   }

   validarLogin(campoValidar: string) {
      const control = this.formularioLogin.get(campoValidar);

      if (control?.invalid) {
         //  console.error(`El campo "${campoValidar}" tiene errores:`);

         const errors = control.errors || {};
         console.log(errors);

         if (errors['required']) {
            // console.error(`- El campo "${campoValidar}" es obligatorio.`);
         }
         if (campoValidar === 'correo' && errors['pattern']) {
            // console.error(`- El campo "correo" debe tener un formato válido (ejemplo: usuario@dominio.com).`);
         }
      } else {
         //  console.log(`El campo "${campoValidar}" es válido.`);
         return true;
      }
      return false;
   }

   togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
   }

   escribiendoContrasena() {
      this.mosrtarControles = true;
   }
}
