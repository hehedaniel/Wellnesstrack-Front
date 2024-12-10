import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProponerRecetaComponent } from '../../comidas/form-proponer-receta/form-proponer-receta.component';
import { FormProponerAlimentoComponent } from '../../comidas/form-proponer-alimento/form-proponer-alimento.component';
import { ProponerComidaStepperComponent } from '../../comidas/proponer-comida-stepper/proponer-comida-stepper.component';

@Component({
   selector: 'app-switch-proponer-comida',
   standalone: true,
   imports: [],
   templateUrl: './switch-proponer-comida.component.html',
   styleUrl: './switch-proponer-comida.component.css',
})
export class SwitchProponerComidaComponent {
   #dialog: MatDialog = inject(MatDialog);

   irAReceta() {
      this.#dialog.closeAll();
      this.#dialog.open(FormProponerRecetaComponent, {
         width: '70%',
         height: '90%',
         maxHeight: '100vh',
      });
   }
   irAAlimento() {
      this.#dialog.closeAll();
      this.#dialog.open(FormProponerAlimentoComponent, {
         width: '70%',
         // height: '90%',
      });
   }

   closeDialog() {
      this.#dialog.closeAll();
   }
}
