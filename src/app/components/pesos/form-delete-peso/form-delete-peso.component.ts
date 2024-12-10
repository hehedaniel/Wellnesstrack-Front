import { Component, Inject, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PesoService } from '../../../services/peso.service';

@Component({
   selector: 'app-form-delete-peso',
   standalone: true,
   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
   templateUrl: './form-delete-peso.component.html',
   styleUrl: './form-delete-peso.component.css',
})
export class FormDeletePesoComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

   #dialog: MatDialog = inject(MatDialog);
   #pesoService: PesoService = inject(PesoService);

   peso: string = '';
   hora: string = '';
   fecha: string = '';
   idUsuario: string = '';

   ngOnInit() {
      this.peso = this.data.peso;
      this.hora = this.data.hora;
      this.fecha = this.data.fecha;

      this.obtenerUsuario();
   }

   deletePeso() {
      this.#pesoService.encontrarPeso(this.idUsuario, this.fecha, this.hora, this.peso).subscribe((data: any) => {
         console.log(data);
         if (data.code === 200) {
            this.#pesoService.deletePeso(data.respuesta.id).subscribe((data: any) => {
               console.log(data);
               if (data.code === 200) {
                  this.closeDialog();
                  location.reload();
               }
            });
         }
      });
   }

   closeDialog() {
      this.#dialog.closeAll();
   }

   obtenerUsuario() {
      this.idUsuario = localStorage.getItem('idUsuarioLogeado') ?? '';
   }
}
