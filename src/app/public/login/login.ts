import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterModule, 
    FormsModule 
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  
  public tipo: 'Cliente' | 'Empleado' = 'Cliente'; 
  public nombre: string = '';
  public contrasena: string = ''; 

  private authService = inject(AuthService);
  private router = inject(Router); 

  // --- ★★ FUNCIÓN handleLogin() MODIFICADA ★★ ---
  handleLogin() {
    if (!this.nombre) {
      alert('Por favor, ingresa un nombre.');
      return;
    }

    // 1. Llamamos al servicio Y capturamos el resultado
    const usuario = this.authService.login(this.nombre, this.tipo);

    // 2. Si el login falló (ej. mal nombre de empleado), no hacemos nada
    if (!usuario) {
      return; 
    }

    // 3. ¡Redirigimos según el ROL!
    switch (usuario.rol) {
      case 'Cliente':
        this.router.navigate(['/']); // A la tienda
        break;
      case 'Administrador':
        this.router.navigate(['/admin/dashboard']); // Al Dashboard
        break;
      case 'Vendedor':
        this.router.navigate(['/admin/punto-de-venta']); // <-- ¡DIRECTO AL POS!
        break;
      case 'Inventario':
        this.router.navigate(['/admin/inventario']); // <-- ¡DIRECTO AL INVENTARIO!
        break;
      default:
        this.router.navigate(['/']); // Fallback
    }
  }
}