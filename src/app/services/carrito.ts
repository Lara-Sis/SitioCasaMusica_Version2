import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  // Función para añadir (la que ya tenías)
  agregarAlCarrito(producto: any, cantidad: number = 1) { 
    const itemExistente = this.items.find(item => item.sku === producto.sku);
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({ ...producto, cantidad: cantidad });
    }
    this.cartItemsSubject.next(this.items);
  }

  // --- ★★ NUEVA FUNCIÓN ★★ ---
  // Actualiza la cantidad de un producto específico
  actualizarCantidad(sku: string, nuevaCantidad: number) {
    const item = this.items.find(item => item.sku === sku);
    if (item) {
      item.cantidad = nuevaCantidad;
    }
    this.cartItemsSubject.next(this.items);
  }

  // --- ★★ NUEVA FUNCIÓN ★★ ---
  // Elimina un producto del carrito
  eliminarDelCarrito(sku: string) {
    this.items = this.items.filter(item => item.sku !== sku);
    this.cartItemsSubject.next(this.items);
  }
}