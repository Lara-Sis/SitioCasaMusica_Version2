import { Component, inject, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { UsuarioService } from '../usuario.service'; 

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true, // <-- La línea clave
  imports: [
    CommonModule,
    RouterModule // <-- La línea clave
  ],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css',
})
export class GestionUsuarios implements OnInit { 

  public listaUsuarios: any[] = [];
  private usuarioService = inject(UsuarioService);

  ngOnInit(): void {
    // (Asegúrate de haber creado el archivo 'usuario.service.ts' que hicimos antes)
    this.listaUsuarios = this.usuarioService.getUsuariosArray();
  }

  eliminarUsuario(id: number) {
    alert(`Simulando eliminación del usuario con ID: ${id}`);
  }
}