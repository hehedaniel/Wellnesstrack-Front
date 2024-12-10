export class UsuarioRegistroModel {
   constructor(
      public nombre: string | null,
      public apellidos: string | null,
      public correo: string | null,
      public edad: number | null,
      public altura: number | null
   ) {}
}
