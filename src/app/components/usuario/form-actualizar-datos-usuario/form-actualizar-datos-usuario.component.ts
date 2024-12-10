import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
   selector: 'app-form-actualizar-datos-usuario',
   standalone: true,
   imports: [
      MatInputModule,
      MatInputModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FloatLabelModule,
      FormsModule,
      ImageModule,
      InputNumberModule,
      FloatLabelModule,
      FormsModule,
      ImageModule,
      InputNumberModule,
      AutoCompleteModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
   ],
   templateUrl: './form-actualizar-datos-usuario.component.html',
   styleUrl: './form-actualizar-datos-usuario.component.css',
})
export class FormActualizarDatosUsuarioComponent {
   #dialog: MatDialog = inject(MatDialog);
   #router: Router = inject(Router);
   #usuarioService: UsuarioService = inject(UsuarioService);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   propiedad: string = '';

   actual: string = '';
   nuevoValor: string = '';

   ngOnInit() {
      this.actual = localStorage.getItem('oldValue') ?? '';
      this.propiedad = localStorage.getItem('propiedad') ?? '';
   }

   actualizar(propiedadCambiar: string) {
      if (this.nuevoValor == '' || this.nuevoValor == undefined) {
         this.#snackBar.open('Por favor, rellene todos los campos', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
         return;
      } else {
         let idUsuario = localStorage.getItem('idUsuarioLogeado') ?? '';
         let nombre = '';
         let apellidos = '';
         let altura = 0;
         let objetivo_opt = '';
         let objetivo_num = 0;

         if (propiedadCambiar == 'nombre') {
            nombre = this.nuevoValor;
         } else {
            nombre = localStorage.getItem('nombre') ?? '';
         }

         if (propiedadCambiar == 'apellidos') {
            apellidos = this.nuevoValor;
         } else {
            apellidos = localStorage.getItem('apellidos') ?? '';
         }

         if (propiedadCambiar == 'altura') {
            altura = parseInt(this.nuevoValor);
         } else {
            altura = parseFloat(localStorage.getItem('altura') ?? '0');
         }

         if (propiedadCambiar == 'objetivo_opt') {
            objetivo_opt = this.nuevoValor;
         } else {
            objetivo_opt = localStorage.getItem('objetivo') ?? '';
         }

         if (propiedadCambiar == 'objetivo_num') {
            objetivo_num = parseInt(this.nuevoValor);
         } else {
            objetivo_num = parseFloat(localStorage.getItem('peso_objetivo') ?? '0');
         }

         this.#usuarioService.putEditarUsuario(idUsuario, nombre, apellidos, altura, objetivo_opt, objetivo_num).subscribe((data: any) => {
            console.log(idUsuario);
            console.log(data);
            if (data.code === 200) {
               this.closeDialog();
               location.reload();
            }
         });
      }
   }

   closeDialog() {
      this.#dialog.closeAll();
   }
}
