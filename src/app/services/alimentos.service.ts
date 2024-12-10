import { Injectable, inject } from '@angular/core';
import { environment } from '../../enviromens/enviroment';
import { HttpClient } from '@angular/common/http';
import { AlimentoProponerModel } from '../models/alimento.model';

@Injectable({
   providedIn: 'root',
})
export class AlimentosService {
   #http: HttpClient = inject(HttpClient);

   url: string = 'http://localhost:8000';

   getConsumoDiario(id: any, fechaInicio: any, fechaFin: any) {
      return this.#http.post(`${environment.urlConsumoDiario}`, { id, fechaInicio, fechaFin });
   }

   getAlimento(id: string) {
      return this.#http.get(`${environment.urlAlimento}/${id}`);
   }

   getBusquedaNombre(nombre: string) {
      return this.#http.post(`${environment.urlBusquedaNombre}`, { nombre });
   }

   getBusquedaReceta(nombre: string) {
      return this.#http.post(`${environment.urlBusquedaReceta}`, { nombre });
   }

   postProponerAlimento(alimento: any, idUsuario: string) {
      return this.#http.post(`${environment.urlProponerAlimento}`, { alimento, idUsuario });
   }

   postProponerReceta(receta: any, idUsuario: string) {
      return this.#http.post(`${environment.urlProponerReceta}`, { receta, idUsuario });
   }

   // Consumo diario

   postConsumoDiarioEspecifico(idUsuario: string, fecha: string, hora: string) {
      return this.#http.post(`${environment.urlConsumoDiarioEspecifico}`, { idUsuario, fecha, hora });
   }

   postConsumoDiarioGuardar(idUsuario: string, cantidad: string, momento: string, fecha: string, hora: string, comida: string) {
      return this.#http.post(`${environment.urlConsumoDiarioGuardar}`, { idUsuario, cantidad, momento, fecha, hora, comida });
   }

   deleteConsumoDiario(comida: string, fecha: string, hora: string, idUsuario: string) {
      return this.#http.post(`${environment.urlConsumoDiarioEliminar}`, { comida, fecha, hora, idUsuario });
   }

   editarConsumoDiario(comida: string, comidaInicial: string, fecha: string, hora: string, idUsuario: string, cantidad: string) {
      return this.#http.put(`${environment.urlConsumoDiarioEditar}`, { comida, comidaInicial, fecha, hora, idUsuario, cantidad });
   }

   postConsumoDiarioNombre(idUsuario: string, fecha: string, hora: string) {
      return this.#http.post(`${environment.urlConsumoDiarioNombre}`, { idUsuario, fecha, hora });
   }

   // Administrar alimentos y recetas

   getAlimentosAdministrar() {
      return this.#http.get(`${environment.urlAlimentosAdministrar}`);
   }

   getRecetasAdministrar() {
      return this.#http.get(`${environment.urlObtenerRecetasAdministrar}`);
   }

   postAceptarAlimento(id: string) {
      return this.#http.post(`${environment.urlAceptarAlimento}`, { id });
   }

   postAceptarReceta(id: string) {
      return this.#http.post(`${environment.urlAceptarReceta}`, { id });
   }

   deleteEliminarAlimento(id: string) {
      return this.#http.post(`${environment.urlRechazarAlimento}`, { id });
   }

   deleteEliminarReceta(id: string) {
      return this.#http.post(`${environment.urlRechazarReceta}`, { id });
   }
}
