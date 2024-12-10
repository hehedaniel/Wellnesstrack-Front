import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FormProponerAlimentoComponent } from '../form-proponer-alimento/form-proponer-alimento.component';
import { FormProponerAlimentoNutrientesComponent } from '../form-proponer-comida-nutrientes/form-proponer-alimento-nutrientes.component';

@Component({
   selector: 'app-proponer-comida-stepper',
   standalone: true,
   imports: [StepperModule, ButtonModule, FormProponerAlimentoComponent, FormProponerAlimentoNutrientesComponent],
   templateUrl: './proponer-comida-stepper.component.html',
   styleUrl: './proponer-comida-stepper.component.css',
})
export class ProponerComidaStepperComponent {}
