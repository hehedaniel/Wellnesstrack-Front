import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormActualizarDatosUsuarioComponent } from '../form-actualizar-datos-usuario/form-actualizar-datos-usuario.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-usuario-perfil',
   standalone: true,
   imports: [MatProgressSpinnerModule],
   templateUrl: './usuario-perfil.component.html',
   styleUrl: './usuario-perfil.component.css',
})
export class UsuarioPerfilComponent {
   #usuarioService: UsuarioService = inject(UsuarioService);
   #authService: AuthService = inject(AuthService);
   #router: Router = inject(Router);
   #dialog: MatDialog = inject(MatDialog);
   #snackBar: MatSnackBar = inject(MatSnackBar);

   userNombre: string = '';
   userApellidos: string = '';
   userEmail: string = '';
   correoVerificado: boolean = false;

   userAltura: number = 0;
   userObjetivo: string = '';
   userPesoObjetivo: number = 0;

   datosUsuarioRecogidos: boolean = false;

   ngOnInit() {
      console.log('Pagina de perfil de usuario');
      this.checkLogedIn();

      this.#authService.fbIsUserVerified().then((verified) => {
         this.correoVerificado = verified;
      });
   }

   checkLogedIn() {
      this.#authService.fbUserEmail().then((email) => {
         if (email !== null) {
            this.userEmail = email;
            this.recogerDatosUsuario(email);
         } else {
            this.#router.navigate(['/login']);
         }
      });
   }

   recogerDatosUsuario(email: string) {
      // Llamar al servicio de usuario para recoger los datos del usuario

      this.#usuarioService.getUser(this.userEmail).subscribe((usuario: any) => {
         if (usuario) {
            console.log(usuario);
            this.userNombre = usuario.respuesta.nombre;
            this.userApellidos = usuario.respuesta.apellidos;
            this.userAltura = usuario.respuesta.altura;
            this.userObjetivo = usuario.respuesta.objetivo_opt;
            this.userPesoObjetivo = usuario.respuesta.objetivo_num;

            // Guardo los datos del usuario en el local storage
            localStorage.setItem('nombreUsuario', this.userNombre);
            localStorage.setItem('apellidos', this.userApellidos);
            localStorage.setItem('altura', this.userAltura.toString());
            localStorage.setItem('objetivo', this.userObjetivo);
            localStorage.setItem('peso_objetivo', this.userPesoObjetivo.toString());

            setTimeout(() => {
               this.datosUsuarioRecogidos = true;
            }, 500);
         } else {
            this.#router.navigate(['/login']);
         }
      });
   }

   editarValor(valorViejo: any, propiedad: string) {
      console.log('Editando propiedad: ' + valorViejo);

      localStorage.setItem('oldValue', valorViejo);
      localStorage.setItem('propiedad', propiedad);

      this.#dialog.open(FormActualizarDatosUsuarioComponent, {
         width: '80%',
         height: 'auto',
      });
   }

   verificarEmail(valorViejo: any, propiedad: string) {
      this.#authService.fbSendVerificationEmail().then(() => {
         console.log('Email de verificación enviado');
         this.#snackBar.open('Email de verificación enviado', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
         });
      });
   }

   cerrarSesion() {
      this.#authService.fbLogout().then(() => {
         console.log('Cerrando sesión');
         localStorage.clear();
         location.reload();
      });
   }
}
