import { Component, inject, OnInit, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { SucursalService } from "../../../core/services/sucursal.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav
      class="sticky top-0 z-50 w-full bg-[#3498db] shadow-sm border-b border-[#2c3e50]"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between"
      >
        <!-- Left: Branding -->
        <div class="flex-shrink-0 flex items-center gap-2">
          <span
            class="text-2xl font-black tracking-wide text-white uppercase font-sans"
          >
            FLOR DE CEVICHE
          </span>
        </div>

        <!-- Center: Navigation Pills (Desktop Only) -->
        <div
          class="hidden md:flex absolute left-1/2 transform -translate-x-1/2"
        >
          <div
            class="flex items-center p-1.5 bg-[#2c3e50] rounded-full border border-white/20"
          >
            <ng-container *ngIf="user?.id_rol !== 2; else vendedorLinks">
              <a
                routerLink="/dashboard"
                routerLinkActive="bg-red-50 !text-[#7f1d1d] shadow-md"
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white/80 hover:text-white transition-all duration-300"
              >
                Reportes
              </a>
              <a
                routerLink="/ventas"
                routerLinkActive="bg-red-50 !text-[#7f1d1d] shadow-md"
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white/80 hover:text-white transition-all duration-300"
              >
                Ventas
              </a>
              <a
                routerLink="/menu"
                routerLinkActive="bg-red-50 !text-[#7f1d1d] shadow-md"
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white/80 hover:text-white transition-all duration-300"
              >
                Menu
              </a>
            </ng-container>
            <ng-template #vendedorLinks>
              <a
                routerLink="/ventas"
                routerLinkActive="bg-red-50 !text-[#7f1d1d] shadow-md"
                class="px-8 py-2.5 rounded-full text-sm font-bold text-white/80 hover:text-white transition-all duration-300"
              >
                Ventas
              </a>
            </ng-template>
          </div>
        </div>

        <!-- Right: Mobile Menu Button (Hamburger) -->
        <div class="flex md:hidden">
          <button
            (click)="toggleMobileMenu()"
            class="p-2 rounded-xl text-white hover:bg-[#2c3e50] focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                *ngIf="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                *ngIf="isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Right: User Profile (Desktop Only) -->
        <div class="hidden md:flex items-center gap-4 relative">
          <div class="relative">
            <button
              (click)="toggleDropdown()"
              class="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-[#2c3e50] border border-white/20 hover:border-white/50 hover:bg-[#e74c3c] transition-all duration-300 group focus:outline-none"
            >
              <div
                class="h-9 w-9 rounded-full bg-gradient-to-br from-shell-pink-400 to-shell-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-shadow"
              >
                {{ getInitials(sucursalName()) }}
              </div>
              <div class="flex flex-col items-start text-left">
                <span
                  class="text-[10px] uppercase font-bold text-white/70 leading-none mb-0.5 tracking-wider"
                  >Sucursal</span
                >
                <span class="text-sm font-bold text-white leading-none">
                  {{ sucursalName() }}
                </span>
              </div>
              <svg
                [class.rotate-180]="isDropdownOpen"
                class="h-4 w-4 text-white/70 group-hover:text-white transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              *ngIf="isDropdownOpen"
              class="absolute right-0 mt-3 w-64 bg-[#2c3e50] rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] border border-[#3498db] py-2 overflow-hidden z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200"
            >
              <div
                class="px-5 py-4 border-b border-white/20 bg-[#2c3e50] flex items-center gap-3"
              >
                <div
                  class="h-10 w-10 rounded-full bg-shell-pink-100 flex items-center justify-center text-shell-pink-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-0.5"
                  >
                    {{ user?.nombre_rol || "SIN ROL" }}
                  </p>
                  <p class="text-sm font-bold text-white">
                    {{ user?.username }}
                  </p>
                </div>
              </div>

              <div class="p-2">
                <button
                  (click)="logout()"
                  class="w-full text-left px-4 py-3 rounded-xl text-sm bg-white text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold flex items-center gap-3 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div
        *ngIf="isMobileMenuOpen"
        class="md:hidden border-t border-[#2c3e50] bg-[#3498db] shadow-lg absolute w-full left-0 z-40"
      >
        <div class="px-4 pt-2 pb-6 space-y-2">
          <!-- Nav Links -->
          <a
            routerLink="/dashboard"
            (click)="closeMobileMenu()"
            routerLinkActive="bg-red-50 !text-[#7f1d1d]"
            class="block px-4 py-3 rounded-xl text-base font-bold text-white/85 hover:bg-[#2c3e50] hover:text-white transition-colors"
          >
            Reportes
          </a>
          <a
            routerLink="/ventas"
            (click)="closeMobileMenu()"
            routerLinkActive="bg-red-50 !text-[#7f1d1d]"
            class="block px-4 py-3 rounded-xl text-base font-bold text-white/85 hover:bg-[#2c3e50] hover:text-white transition-colors"
          >
            Ventas
          </a>
          <a
            routerLink="/menu"
            (click)="closeMobileMenu()"
            routerLinkActive="bg-red-50 !text-[#7f1d1d]"
            class="block px-4 py-3 rounded-xl text-base font-bold text-white/85 hover:bg-[#2c3e50] hover:text-white transition-colors"
          >
            Menu
          </a>

          <!-- Divider -->
          <div class="border-t border-white/20 my-2"></div>

          <!-- Profile Info Mobile -->
          <div
            class="px-4 py-3 flex items-center gap-3 bg-[#2c3e50] rounded-xl mb-2"
          >
            <div
              class="h-10 w-10 rounded-full bg-shell-pink-100 flex items-center justify-center text-shell-pink-600 font-bold"
            >
              {{ getInitials(sucursalName()) }}
            </div>
            <div>
              <p
                class="text-xs font-bold text-white/70 uppercase tracking-wider mb-0.5"
              >
                {{ sucursalName() }}
              </p>
              <p class="text-sm font-bold text-white">
                {{ user?.username }}
              </p>
            </div>
          </div>

          <!-- Logout -->
          <button
            (click)="logout()"
            class="w-full text-left px-4 py-3 rounded-xl text-sm bg-white text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold flex items-center gap-3 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>

    <!-- Backdrop for click outside (Desktop) -->
    <div
      *ngIf="isDropdownOpen"
      (click)="closeDropdown()"
      class="fixed inset-0 z-40 cursor-default bg-transparent"
    ></div>

    <!-- Backdrop for click outside (Mobile) -->
    <div
      *ngIf="isMobileMenuOpen"
      (click)="closeMobileMenu()"
      class="fixed inset-0 z-30 cursor-default bg-black/20 md:hidden"
    ></div>
  `,
})
export class ShellNavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private sucursalService = inject(SucursalService);
  user = this.authService.currentUser;
  private userSub?: Subscription;

  isDropdownOpen = false;
  isMobileMenuOpen = false;

  sucursalName = computed(() => {
    const user = this.user;
    if (user?.id_sucursal) {
      return this.sucursalService.getNombreSucursal(user.id_sucursal);
    }
    return user?.nombre_sucursal || "Sin Sucursal";
  });

  ngOnInit() {
    // Cargar sucursales al iniciar el navbar
    if (!this.sucursalService.hasCachedSucursales()) {
      this.sucursalService.loadSucursales().subscribe({
        error: (err) =>
          console.error("Error cargando sucursales en navbar", err),
      });
    }
    // Suscribirse a cambios de usuario
    this.userSub = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.closeDropdown();
    this.closeMobileMenu();
  }

  getInitials(name: string): string {
    return name ? name.substring(0, 2).toUpperCase() : "SF";
  }
}
