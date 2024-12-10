import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/global/toolbar/toolbar.component';

@Component({
   selector: 'app-root',
   standalone: true,
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
   imports: [RouterOutlet, CommonModule, ToolbarComponent],
})
export class AppComponent {
   title = 'WellnessTrack';
}
