import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";

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
            SHELLFRUTY
          </span>
        </div>

        <!-- Center: Navigation Pills -->
        <div
          class="hidden md:flex absolute left-1/2 transform -translate-x-1/2"
        >
          <div
            class="flex items-center p-1.5 bg-[#2c3e50] rounded-full border border-white/20"
          >
            <a
              routerLink="/reportes"
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
          </div>
        </div>

        <!-- Right: User Profile -->
        <div class="flex items-center gap-4 relative">
          <div class="relative">
            <button
              (click)="toggleDropdown()"
              class="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-[#2c3e50] border border-white/20 hover:border-white/50 hover:bg-[#e74c3c] transition-all duration-300 group focus:outline-none"
            >
              <div
                class="h-9 w-9 rounded-full bg-gradient-to-br from-shell-pink-400 to-shell-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-shadow"
              >
                {{ getInitials(sucursalName) }}
              </div>
              <div class="flex flex-col items-start text-left">
                <span
                  class="text-[10px] uppercase font-bold text-white/70 leading-none mb-0.5 tracking-wider"
                  >Sucursal</span
                >
                <span class="text-sm font-bold text-white leading-none">
                  {{ sucursalName }}
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
                    Rol Actual
                  </p>
                  <p class="text-sm font-bold text-white">
                    {{ user?.nombre_rol || "Sin Rol" }}
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
    </nav>

    <!-- Backdrop for click outside -->
    <div
      *ngIf="isDropdownOpen"
      (click)="closeDropdown()"
      class="fixed inset-0 z-40 cursor-default bg-transparent"
    ></div>
  `,
})
export class NavbarComponent {
  private authService = inject(AuthService);
  user = this.authService.currentUser;

  isDropdownOpen = false;

  get sucursalName(): string {
    return this.user?.nombre_sucursal || "Tarija";
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.closeDropdown();
  }

  getInitials(name: string): string {
    return name ? name.substring(0, 2).toUpperCase() : "SF";
  }
}
