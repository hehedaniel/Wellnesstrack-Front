import { url } from 'inspector';

const urlBase = 'http://localhost:8000';
// const urlBase = 'http://16.171.27.146';

export const environment = {
   ulr: urlBase,

   urlCrearUsuario: `${urlBase}/usuario/crear`,
   urlObtenerUsuario: `${urlBase}/usuario/buscar`,
   urlObtenerRolUsuario: `${urlBase}/usuario/buscarrol`,
   urlEditarUsuario: `${urlBase}/usuario/editar`,
   urlUsuarioAdmin: `${urlBase}/usuario/esadmin`,

   urlConsumoDiario: `${urlBase}/consumodia/usuario/rango`,
   urlConsumoDiarioGuardar: `${urlBase}/consumodia/crear/usuario`,
   urlConsumoDiarioEliminar: `${urlBase}/consumodia/eliminar`,
   urlConsumoDiarioEditar: `${urlBase}/consumodia/editar`,
   urlConsumoDiarioNombre: `${urlBase}/consumodia/datosnombre`,
   urlConsumoDiarioEspecifico: `${urlBase}/consumodia/usuario/fechahora`,

   urlBusquedaNombre: `${urlBase}/alimento/nombre`,
   urlAlimento: `${urlBase}/alimento/index`,
   urlProponerAlimento: `${urlBase}/alimento/crear`,
   urlAlimentosAdministrar: `${urlBase}/alimento/administrar`,
   urlRechazarAlimento: `${urlBase}/alimento/rechazar`,
   urlAceptarAlimento: `${urlBase}/alimento/aceptar`,

   urlObtenerPesos: `${urlBase}/peso/rangofechas`,
   urlGetAllPesos: `${urlBase}/peso/usuario`,
   urlEditarPeso: `${urlBase}/peso/editar`,
   urlEliminarPeso: `${urlBase}/peso/eliminar`,
   urlEncontrarPeso: `${urlBase}/peso/encontrar`,
   urlAnadirPeso: `${urlBase}/peso/crear`,
   urlUltimoPeso: `${urlBase}/peso/ultimo`,

   urlObtenerTodosEjercicio: `${urlBase}/ejercicio`,
   urlProponerEjercicio: `${urlBase}/ejercicio/crear`,
   urlObtenerEjercicios: `${urlBase}/usuariorealizaejercicio/usuario`,
   urlEditarEjercicioRealizado: `${urlBase}/usuariorealizaejercicio/editar`,
   urlEliminarEjercicioRealizado: `${urlBase}/usuariorealizaejercicio/eliminar`,

   urlUsuarioRealizaEjercicio: `${urlBase}/usuariorealizaejercicio/realiza`,
   urlObtenerEjerciciosFecha: `${urlBase}/usuariorealizaejercicio/usuario/fecha`,
   urlObtenerEjerciciosRango: `${urlBase}/usuariorealizaejercicio/usuario/rango`,

   urlObtenerEjerciciosAdministrar: `${urlBase}/ejercicio/administrar`,
   urlAceptarEjercicioPropuesto: `${urlBase}/ejercicio/aceptar`,
   urlEliminarEjercicioPropuesto: `${urlBase}/ejercicio/rechazar`,

   urlBusquedaReceta: `${urlBase}/receta/buscarnombre`,
   urlProponerReceta: `${urlBase}/receta/crear`,
   urlObtenerRecetasAdministrar: `${urlBase}/receta/administrar`,
   urlRechazarReceta: `${urlBase}/receta/rechazar`,
   urlAceptarReceta: `${urlBase}/receta/aceptar`,
};
