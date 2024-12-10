import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../enviromens/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PesoService {

  #http: HttpClient = inject(HttpClient);

  url: string = 'http://localhost:8000';

  getPesos(idUsuario: any, fechaInicio: any, fechaFin: any){
    return this.#http.post(`${environment.urlObtenerPesos}`, {idUsuario, fechaInicio, fechaFin});
  }

  getAllPesos($idUsuario: any){
    return this.#http.get(`${environment.urlGetAllPesos}/${$idUsuario}`);
  }

  putEditarPeso(idUsuario: any, fecha: any, hora: any, peso: any){
    return this.#http.put(`${environment.urlEditarPeso}`, {idUsuario, fecha, hora, peso});
  }

  encontrarPeso(idUsuario: any, fecha: any, hora: any, peso: any){
    return this.#http.post(`${environment.urlEncontrarPeso}`, {idUsuario, fecha, hora, peso});
  }

  deletePeso(idPeso: any){
    return this.#http.delete(`${environment.urlEliminarPeso}/${idPeso}`);
  }

  postAnadirPeso(idUsuario: any, fecha: any, hora: any, peso: any){
    return this.#http.post(`${environment.urlAnadirPeso}`, {idUsuario, fecha, hora, peso});
  }

  postUltimoPeso(idUsuario: any){
    return this.#http.post(`${environment.urlUltimoPeso}`, {idUsuario});
  }
}
