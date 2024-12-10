export class AlimentoProponerModel {
  constructor(

    public nombre: string | null,
    public cantidad: number | null,
    public marca: string | null,
    public descripcion: string | null,
    public imagen: string | null,
    public calorias: number | null,
    public proteinas: number | null,
    public grasas: number | null,
    public carbohidratos: number | null,
    public azucares: number | null,
    public vitaminas: number | null,
    public idUsuario: string | null,
  ) { }
}

export class ConsumoDiario {
  constructor (
    public comida: string | null,
    public fecha: string | null,
    public hora: string | null,
    public idUsuario: string | null,
  ){}
}