import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- 1. IMPORTAR FORMSMODULE

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // <-- 2. AÑADIR FORMSMODULE
  ],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes {

  // 3. Variables para controlar el estado
  public reporteActivo: 'ventas' | 'inventario' | 'clientes' = 'ventas';
  public fechaDesde: string = '';
  public fechaHasta: string = '';

  // 4. Datos simulados para la tabla
  public datosReporte: any[] = [
    { col1: 'Dato A', col2: 150, col3: '$5,000.00' },
    { col1: 'Dato B', col2: 200, col3: '$12,000.00' },
    { col1: 'Dato C', col2: 90, col3: '$3,150.00' },
  ];

  // 5. Función para cambiar de reporte
  seleccionarReporte(tipo: 'ventas' | 'inventario' | 'clientes') {
    this.reporteActivo = tipo;
    // (Aquí, en el futuro, se volverían a cargar los datos)
  }

  // 6. Función para simular la generación
  generarReporte() {
    alert(`Generando reporte de '${this.reporteActivo}' desde ${this.fechaDesde} hasta ${this.fechaHasta}. (Simulación)`);
  }
}