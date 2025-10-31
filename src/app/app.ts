import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule 
  ],
  templateUrl: './app.html', 
  styleUrl: './app.css'      
})
export class App { // <--- ¡AQUÍ ESTÁ EL CAMBIO!
  title = 'casa-musica-frontend';
}