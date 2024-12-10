import { Injectable, inject } from '@angular/core';
import { environment } from '../../enviromens/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
   providedIn: 'root',
})
export class EjerciciosRealizadosService {
   #http: HttpClient = inject(HttpClient);

   getEjercicioRealizados(usuario: any) {
      return this.#http.get(`${environment.urlObtenerEjercicios}/${usuario}`);
   }

   postEjercicioRealizadosFecha(idUsuario: any, fecha: any) {
      return this.#http.post(`${environment.urlObtenerEjerciciosFecha}`, { idUsuario, fecha });
   }

   postEjercicioRealizadosRango(idUsuario: any, fechaInicio: any, fechaFin: any) {
      return this.#http.post(`${environment.urlObtenerEjerciciosRango}`, { idUsuario, fechaInicio, fechaFin });
   }

   postBusquedaNombre(nombre: string) {
      return this.#http.post(`${environment.urlObtenerTodosEjercicio}/nombreConEnlaces`, { nombre });
   }

   postEjercicioRealizadoGuardar(idEjercicio: string, idUsuario: string, tiempo: string, met: string) {
      return this.#http.post(`${environment.urlUsuarioRealizaEjercicio}`, { idEjercicio, idUsuario, tiempo, met });
   }

   postProponerEjercicio(
      nombre: string,
      dificultad: string,
      grupoMuscular: string,
      valorMET: string,
      descripcion: string,
      instrucciones: string,
      idUsuario: string,
      enlace1: string,
      enlace2: string
   ) {
      return this.#http.post(`${environment.urlProponerEjercicio}`, {
         nombre,
         dificultad,
         grupoMuscular,
         valorMET,
         descripcion,
         instrucciones,
         idUsuario,
         enlace1,
         enlace2,
      });
   }

   putEditarEjercicioRealizado(
      idUsuario: string,
      fecha: string,
      hora: string,
      idEjercicioViejo: string,
      tiempo: string,
      idEjercicioNuevo: string,
      met: string
   ) {
      return this.#http.put(`${environment.urlEditarEjercicioRealizado}`, {
         idUsuario,
         fecha,
         hora,
         idEjercicioViejo,
         tiempo,
         idEjercicioNuevo,
         met,
      });
   }

   deleteEjercicioRealizado(idUsuario: string, fecha: string, hora: string, idEjercicio: string) {
      return this.#http.post(`${environment.urlEliminarEjercicioRealizado}`, { idUsuario, fecha, hora, idEjercicio });
   }

   getEjerciciosAdministrar() {
      return this.#http.get(`${environment.urlObtenerEjerciciosAdministrar}`);
   }

   postAceptarEjercicio(idEjercicio: string) {
      return this.#http.post(`${environment.urlAceptarEjercicioPropuesto}`, { idEjercicio });
   }

   putEliminarEjercicioPropuesto(idEjercicio: string) {
      return this.#http.put(`${environment.urlEliminarEjercicioPropuesto}`, { idEjercicio });
   }
}
