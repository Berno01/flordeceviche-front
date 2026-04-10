import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import {
  MenuService,
  MenuBackendDto,
  ApiResponse,
} from "./services/menu.service";
import { SucursalService } from "../../core/services/sucursal.service";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-[#7f1d1d] pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header Section -->
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-[#8a2020] rounded-3xl p-6 border border-red-600"
        >
          <div>
            <h1
              class="text-3xl font-extrabold text-red-50 tracking-tight mb-1"
            >
              Gestión de Menú
            </h1>
            <p class="text-red-100 font-medium">
              Administra productos, precios e ingredientes
            </p>
          </div>

          <!-- Toolbar -->
          <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div class="relative group">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-red-300 group-focus-within:text-red-100 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                class="block w-full sm:w-80 pl-11 pr-4 py-3 rounded-xl border border-red-700 bg-red-900/40 text-red-50 leading-5 placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:border-[#e74c3c] sm:text-sm transition-shadow shadow-sm"
                placeholder="Buscar producto..."
              />
            </div>

            <button
              routerLink="/menu/create"
              class="flex items-center justify-center gap-2 bg-[#991b1b] hover:bg-[#c0392b] hover:text-red-50 text-red-50 font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-950/40 transition-all hover:scale-105 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Nuevo Producto
            </button>
          </div>
        </div>

        <!-- Cards Grid -->
        <div
          class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          <div
            *ngFor="let product of filteredProducts()"
            [ngClass]="
              product.estado
                ? 'bg-[#8a2020] border-red-600 hover:shadow-xl hover:shadow-red-950/60'
                : 'bg-[#5f1414] border-red-700 opacity-80'
            "
            class="rounded-xl sm:rounded-3xl border p-3 sm:p-6 transition-all duration-300 relative group overflow-hidden"
          >
            <!-- Top Row: Status & Config -->
            <div class="flex justify-between items-start mb-2 sm:mb-6">
              <!-- Status Badge (only for inactive) -->
              <div>
                <button
                  (click)="toggleProduct(product)"
                  *ngIf="!product.estado"
                  class="inline-flex items-center px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold bg-red-900 text-red-200 uppercase tracking-wide border border-red-700 hover:bg-red-700 hover:text-red-50 hover:border-red-500 transition-colors cursor-pointer"
                >
                  <span class="sm:hidden">OFF</span>
                  <span class="hidden sm:inline">Inactivo (Activar)</span>
                </button>
              </div>

              <button
                [routerLink]="['/menu/edit', product.id_menu]"
                class="text-red-300 hover:text-red-50 transition-colors p-1 rounded-full hover:bg-red-700/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <div class="mb-3 sm:mb-6">
              <div
                class="w-full h-24 sm:h-32 rounded-lg sm:rounded-2xl bg-red-900/60 border border-red-700 flex items-center justify-center overflow-hidden"
              >
                <ng-container
                  *ngIf="product.url_foto; else menuPhotoPlaceholder"
                >
                  <img
                    [src]="product.url_foto"
                    [alt]="product.nombre_menu"
                    class="w-full h-full object-cover"
                  />
                </ng-container>
                <ng-template #menuPhotoPlaceholder>
                  <div class="text-center text-red-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7h2l2-3h10l2 3h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zm9 3a4 4 0 100 8 4 4 0 000-8z"
                      />
                    </svg>
                    <p class="text-[10px] sm:text-xs font-semibold">
                      Sin imagen
                    </p>
                  </div>
                </ng-template>
              </div>
            </div>

            <!-- Product Info -->
            <div class="mb-3 sm:mb-8">
              <h3
                class="text-sm sm:text-xl font-extrabold text-red-50 mb-1 sm:mb-2 line-clamp-2 leading-tight min-h-[2.5em] sm:min-h-0"
              >
                {{ product.nombre_menu }}
              </h3>
              <div class="flex items-baseline gap-1">
                <span
                  [ngClass]="{
                    'text-red-50': product.estado,
                    'text-red-300': !product.estado,
                  }"
                  class="text-xl sm:text-4xl font-extrabold transition-colors"
                >
                  {{ product.precio_menu }}
                </span>
                <span class="text-xs sm:text-sm font-semibold text-red-300"
                  >Bs.</span
                >
              </div>
            </div>

            <!-- Status Footer -->
            <div
              class="flex items-center justify-between pt-2 sm:pt-4 border-t border-red-700/70"
            >
              <span class="text-xs sm:text-sm font-bold text-red-200"
                >Estado</span
              >

              <!-- Toggle Switch -->
              <button
                (click)="toggleProduct(product)"
                class="relative inline-flex flex-shrink-0 h-5 w-9 sm:h-6 sm:w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
                [ngClass]="{
                  'bg-shell-pink-400': product.estado,
                  'bg-red-700': !product.estado,
                }"
              >
                <span class="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  [ngClass]="{
                    'translate-x-5': product.estado,
                    'translate-x-0': !product.estado,
                  }"
                  class="pointer-events-none inline-block h-5 w-5 rounded-full bg-red-300 shadow transform ring-0 transition ease-in-out duration-200"
                >
                </span>
              </button>

              <span
                class="text-sm font-bold ml-2"
                [ngClass]="{
                  'text-red-50': product.estado,
                  'text-red-400': !product.estado,
                }"
              >
                {{ product.estado ? "Activo" : "Inactivo" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MenuComponent implements OnInit {
  private menuService = inject(MenuService);
  private sucursalService = inject(SucursalService);

  // Usamos signals para manejar el estado
  products = signal<MenuBackendDto[]>([]);
  searchQuery = signal("");

  // Computed signal para filtrar productos
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const products = this.products();
    if (!query) return products;

    return products.filter((p) => p.nombre_menu.toLowerCase().includes(query));
  });

  ngOnInit() {
    this.loadSucursales();
    this.loadMenus();
  }

  private loadSucursales() {
    if (!this.sucursalService.hasCachedSucursales()) {
      this.sucursalService.loadSucursales().subscribe({
        error: (err) => console.error("Error cargando sucursales en menu", err),
      });
    }
  }

  loadMenus() {
    this.menuService.getAll().subscribe({
      next: (response: ApiResponse<MenuBackendDto[]>) => {
        if (response.success) {
          const sanitized = response.data.map((item) => ({
            ...item,
            url_foto: this.sanitizeImageUrl(item.url_foto),
          }));
          this.products.set(sanitized);
        }
      },
      error: (err: any) => console.error("Error cargando menús", err),
    });
  }

  toggleProduct(product: MenuBackendDto) {
    if (product.estado) {
      if (confirm(`¿Estás seguro de desactivar ${product.nombre_menu}?`)) {
        this.menuService.delete(product.id_menu).subscribe({
          next: (response: ApiResponse<any>) => {
            if (response.success) {
              // Actualizamos el estado localmente para reflejar el cambio inmediato
              this.products.update((products) =>
                products.map((p) =>
                  p.id_menu === product.id_menu ? { ...p, estado: false } : p,
                ),
              );
            }
          },
          error: (err: any) => console.error("Error al desactivar", err),
        });
      }
    } else {
      // Activar producto
      this.menuService.activate(product.id_menu).subscribe({
        next: (response: ApiResponse<any>) => {
          if (response.success) {
            this.loadMenus(); // Recargar listado como solicitado
          }
        },
        error: (err: any) => console.error("Error al activar", err),
      });
    }
  }

  private sanitizeImageUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    return url.replace(/\\/g, "");
  }
}
