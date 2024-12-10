import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-registro',
   standalone: true,
   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatLabel, MatFormField, MatInput, MatIcon],
   templateUrl: './registro.component.html',
   styleUrl: './registro.component.css',
})
export class RegistroComponent {
   // Servicios del componente
   #router: Router = inject(Router);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   // Variables del componente
   formularioRegistro: FormGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contrasenarepeat: new FormControl('', [Validators.required, Validators.minLength(6)]),
   });

   hide = true;

   registrarUsuario() {
      if (this.formularioRegistro.value.contrasena != this.formularioRegistro.value.contrasenarepeat) {
         this.#snackBar.open('Las contraseñas deben ser iguales', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      }
      //Guardar los datos del formulario en localStorage
      localStorage.setItem('correo', this.formularioRegistro.value.correo);
      localStorage.setItem('contrasena', this.formularioRegistro.value.contrasena);
      this.#router.navigate(['/registrodatos']);
   }
}
