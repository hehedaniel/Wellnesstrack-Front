import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: 'home',
      loadComponent: () => import('./components/global/home/home.component').then((m) => m.HomeComponent),
   },
   {
      path: 'comidas',
      loadComponent: () => import('./components/comidas/comidas-home/comidas-home.component').then((m) => m.ComidasHomeComponent),
   },
   {
      path: 'ejercicios',
      loadComponent: () => import('./components/ejercicios/ejercicios-home/ejercicios-home.component').then((m) => m.EjerciciosHomeComponent),
   },
   {
      path: 'peso',
      loadComponent: () => import('./components/pesos/pesos-home/pesos-home.component').then((m) => m.PesosHomeComponent),
   },
   {
      path: 'login',
      loadComponent: () => import('./components/usuario/formulario-tabs/formulario-tabs.component').then((m) => m.FormularioTabsComponent),
   },
   {
      path: 'perfil',
      loadComponent: () => import('./components/usuario/usuario-perfil/usuario-perfil.component').then((m) => m.UsuarioPerfilComponent),
   },
   {
      path: 'administrar-propuestas',
      loadComponent: () =>
         import('./components/global/administrar-propuestas/administrar-propuestas.component').then(
            (m) => m.AdministrarEjerciciosPropuestosComponent
         ),
   },
   {
      path: 'registrodatos',
      loadComponent: () => import('./components/usuario/registrodatos/registrodatos.component').then((m) => m.RegistrodatosComponent),
   },
   {
      path: 'registro',
      redirectTo: 'login',
      pathMatch: 'full',
   },
   {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
   },
   {
      path: '**',
      loadComponent: () => import('./components/global/pagina-error/pagina-error.component').then((m) => m.PaginaErrorComponent),
   },
];
