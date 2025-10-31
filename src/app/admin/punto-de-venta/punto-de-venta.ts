import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- 1. IMPORTAR FORMS
import { RouterModule } from '@angular/router'; // <-- 2. IMPORTAR ROUTER

// 3. Importamos el servicio de inventario
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-punto-de-venta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,  // <-- 4. AÑADIR FORMS
    RouterModule  // <-- 5. AÑADIR ROUTER
  ],
  templateUrl: './punto-de-venta.html',
  styleUrl: './punto-de-venta.css',
})
export class PuntoDeVenta implements OnInit {

  // 6. Inyectamos los servicios
  private inventarioService = inject(InventarioService);

  // 7. Variables para la lógica del POS
  public todoElInventario: any[] = [];
  public resultadosBusqueda: any[] = [];
  public busqueda: string = '';

  public ticketActual: any[] = [];
  public subtotal: number = 0;
  public iva: number = 0;
  public total: number = 0;

  ngOnInit(): void {
    // Cargamos todo el inventario en memoria para búsquedas rápidas
    this.todoElInventario = this.inventarioService.getInventarioArray();
    this.resultadosBusqueda = this.todoElInventario.slice(0, 5); // Mostramos los 5 primeros por defecto
  }

  // --- Funciones de Búsqueda ---
  buscarProducto() {
    if (this.busqueda.trim() === '') {
      this.resultadosBusqueda = this.todoElInventario.slice(0, 5); // Muestra los 5 primeros si está vacío
      return;
    }
    
    // Filtra el inventario completo
    this.resultadosBusqueda = this.todoElInventario.filter(p => 
      p.producto.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      p.sku.toLowerCase().includes(this.busqueda.toLowerCase())
    ).slice(0, 10); // Muestra los primeros 10 resultados
  }

  // --- Funciones del Ticket ---
  agregarAlTicket(producto: any) {
    const itemExistente = this.ticketActual.find(item => item.sku === producto.sku);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.ticketActual.push({ ...producto, cantidad: 1 });
    }
    this.calcularTotales();
    
    // Limpiamos la búsqueda
    this.busqueda = '';
    this.resultadosBusqueda = this.todoElInventario.slice(0, 5);
  }

  eliminarDelTicket(sku: string) {
    this.ticketActual = this.ticketActual.filter(item => item.sku !== sku);
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = this.ticketActual.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    this.iva = this.subtotal * 0.16; // 16% de IVA (simulado)
    this.total = this.subtotal + this.iva;
  }

  finalizarVenta() {
    alert(`Venta finalizada por un total de: ${this.total.toFixed(2)}. (Simulación)`);
    // (Aquí iría la lógica para descontar stock del InventarioService)
    
    // Reseteamos el ticket
    this.ticketActual = [];
    this.calcularTotales();
  }
}