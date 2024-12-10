import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from '../../../services/usuario.service';
// import { AuthService } from '../../services/auth.service';
import { UsuarioRegistroModel } from '../../../models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-registrodatos',
   standalone: true,
   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatLabel, MatFormField, MatInput],
   templateUrl: './registrodatos.component.html',
   styleUrl: './registrodatos.component.css',
})
export class RegistrodatosComponent implements OnInit {
   #authService: AuthService = inject(AuthService);
   #usuarioService: UsuarioService = inject(UsuarioService);
   #router: Router = inject(Router);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   formularioDatos: FormGroup = new FormGroup({
      nombre: new FormControl('', [
         Validators.required,
         Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$'), // Solo letras y espacios
      ]),
      apellidos: new FormControl('', [
         Validators.required,
         Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$'), // Solo letras y espacios
      ]),
      edad: new FormControl('', [
         Validators.required,
         Validators.min(1), // Edad mínima
         Validators.max(120), // Edad máxima
      ]),
      altura: new FormControl('', [
         Validators.required,
         Validators.min(63), // Altura mínima en cm
         Validators.max(272), // Altura máxima en cm
      ]),
   });

   correo: string = localStorage.getItem('correo') || '';
   contrasena: string = localStorage.getItem('contrasena') || '';

   ngOnInit(): void {
      if (
         localStorage.getItem('correo') == '' ||
         localStorage.getItem('contrasena') == '' ||
         localStorage.getItem('correo') == null ||
         localStorage.getItem('contrasena') == null
      ) {
         this.#router.navigate(['/login']);
      }
   }

   registrarUsuario() {
      console.log(this.formularioDatos.value);

      if (this.validarCampo('nombre')) {
         this.#snackBar.open('Falta el nombre', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      } else if (this.validarCampo('apellidos')) {
         this.#snackBar.open('Falta el apellido', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      } else if (this.validarCampo('edad')) {
         this.#snackBar.open('Falta la edad', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      } else if (this.validarCampo('altura')) {
         this.#snackBar.open('Falta la altura', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      } else {
         //Registro completo con correo y contraseña
         this.#authService.fbRegistro(this.correo, this.contrasena).then(
            (userCredential) => {
               if (userCredential && userCredential.user) {
                  console.log('Registro completado:', userCredential.user);
                  this.guardarRegistroBBDD();
               } else {
                  console.log('Error: Usuario no registrado.');

                  this.#snackBar.open('Error en el registro, intentelo mas tarde', '', {
                     duration: 2000,
                     horizontalPosition: 'center',
                     verticalPosition: 'top',
                     panelClass: ['error-snackbar'],
                  });
               }
            },
            (error: any) => {
               console.log(error.message);
               if (error.message == 'EMAIL_EXISTS') {
                  this.#snackBar.open('El correo ya existe', '', {
                     duration: 2000,
                     horizontalPosition: 'center',
                     verticalPosition: 'top',
                     panelClass: ['error-snackbar'],
                  });
               } else {
                  this.#snackBar.open('Error en el registro, intentelo mas tarde', '', {
                     duration: 2000,
                     horizontalPosition: 'center',
                     verticalPosition: 'top',
                     panelClass: ['error-snackbar'],
                  });
               }
            }
         );
      }
   }

   guardarRegistroBBDD() {
      let usuario = new UsuarioRegistroModel(
         this.formularioDatos.value.nombre,
         this.formularioDatos.value.apellidos,
         this.correo,
         this.formularioDatos.value.edad,
         this.formularioDatos.value.altura
      );

      this.#usuarioService.postRegistro(usuario).subscribe({
         next: (
            Respuesta:
               | {
                    code: string;
                    respuesta: Array<string>;
                 }
               | {}
         ) => {
            if ('code' in Respuesta && Respuesta.code == '200') {
               console.log('Registro completado');
               this.#authService.fbLogout().then(() => {
                  // console.log('Cerrando sesión');
                  localStorage.clear();
                  location.reload();
               });
               this.#snackBar.open('Registro completado, ya puedes inicia sesión', '', {
                  duration: 2000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
               });
               this.#router.navigate(['/login']);
            } else {
               console.log('Error:', Respuesta);
            }
         },
         error: (error: any) => {
            console.log('Error:', error);
         },
      });
   }

   validarCampo(campo: string): boolean {
      const control = this.formularioDatos.get(campo);
      return control?.invalid || false;
   }
}
