import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private productos = [
    { sku: 'FEN-FA125', producto: 'Guitarra Acústica Fender FA-125', stock: 8, precio: 3500.00 },
    { sku: 'YAM-E373', producto: 'Teclado Yamaha PSR-E373', stock: 5, precio: 4200.00 },
    { sku: 'HOH-SP20', producto: 'Armónica Hohner Special 20', stock: 15, precio: 850.00 }
  ];

  private productosSubject = new BehaviorSubject<any[]>(this.productos);

  constructor() { }

  // --- FUNCIONES CRUD (Estas ya las tienes) ---
  getInventario() {
    // Devuelve el "stream" (Observable)
    return this.productosSubject.asObservable();
  }
  getProductoPorSku(sku: string) {
    return this.productosSubject.value.find(p => p.sku === sku);
  }
  addProduct(producto: any) {
    const listaActual = this.productosSubject.value;
    const nuevaLista = [...listaActual, producto];
    this.productosSubject.next(nuevaLista);
  }
  updateProduct(sku: string, productoActualizado: any) {
    const listaActual = this.productosSubject.value;
    const indice = listaActual.findIndex(p => p.sku === sku);
    if (indice !== -1) {
      listaActual[indice] = productoActualizado;
      this.productosSubject.next([...listaActual]);
    }
  }
  deleteProduct(sku: string) {
    const listaActual = this.productosSubject.value;
    const nuevaLista = listaActual.filter(p => p.sku !== sku);
    this.productosSubject.next(nuevaLista);
  }

  // --- ★★ NUEVA FUNCIÓN (LA SOLUCIÓN) ★★ ---
  // Esta función devuelve la lista como un Array simple.
  // La usaremos en las páginas que solo necesitan "leer" los datos.
  getInventarioArray() {
    return this.productosSubject.value;
  }
}