import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../enviromens/enviroment';
import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root',
})
export class UsuarioService {
   #http: HttpClient = inject(HttpClient);
   #authService: AuthService = inject(AuthService);

   url: string = 'http://localhost:8000';

   getUser(email: string) {
      return this.#http.post(environment.urlObtenerUsuario, { email });
   }

   getRolUsuario(idUsuario: any) {
      return this.#http.post(environment.urlObtenerRolUsuario, { idUsuario });
   }

   postRegistro(usuario: any) {
      return this.#http.post(environment.urlCrearUsuario, usuario);
   }

   putEditarUsuario(idUsuario: any, nombre: string, apellidos: string, altura: number, objetivo_opt: string, objetivo_num: number) {
      return this.#http.put(`${environment.urlEditarUsuario}/${idUsuario}`, {
         nombre,
         apellidos,
         altura,
         objetivo_opt,
         objetivo_num,
      });
   }

   getIDUsuario() {
      this.#authService.fbUserEmail().then((email) => {
         this.getUser(email).subscribe((usuario: any) => {
            if (usuario) {
               return usuario.respuesta.id.toISOString();
            } else {
               return null;
            }
         });
      });
   }

   getUsuarioAdmin(idUsuario: any) {
      return this.#http.post(environment.urlUsuarioAdmin, { idUsuario });
   }
}
