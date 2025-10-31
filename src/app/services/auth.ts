import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Definimos los tipos de rol que existen
export type UserRole = 'Cliente' | 'Administrador' | 'Vendedor' | 'Inventario' | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any | null>(null);
  public currentUser$ = this.userSubject.asObservable();

  constructor() { }

  // --- ★★ FUNCIÓN DE LOGIN MODIFICADA ★★ ---
  // Ahora devuelve el 'usuario' o 'null'
  login(nombre: string, tipo: 'Cliente' | 'Empleado'): any | null { 
    
    let usuario: any = null;

    if (tipo === 'Cliente') {
      usuario = { nombre: nombre, rol: 'Cliente' };
    
    } else { 
      let rolSimulado: UserRole = null;
      const nombreLower = nombre.toLowerCase();

      if (nombreLower === 'admin') {
        rolSimulado = 'Administrador';
      } else if (nombreLower === 'vendedor') {
        rolSimulado = 'Vendedor';
      } else if (nombreLower === 'inventario') {
        rolSimulado = 'Inventario';
      } else {
        alert('Nombre de empleado no reconocido');
        return null; // <-- 1. Si falla, devuelve null
      }
      usuario = { nombre: nombre, rol: rolSimulado };
    }

    this.userSubject.next(usuario);
    return usuario; // <-- 2. Si tiene éxito, devuelve el usuario
  }

  logout() {
    this.userSubject.next(null);
  }

  public tieneRol(rol: UserRole): boolean {
    return this.userSubject.value?.rol === rol;
  }
}