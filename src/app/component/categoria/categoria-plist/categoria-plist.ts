import { Component } from '@angular/core';
import { ICategoria } from '../../../model/categoria';
import { IPage } from '../../../model/plist';
import { CategoriaService } from '../../../service/categoria';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { TrimPipe } from '../../../pipe/trim-pipe';

@Component({
  selector: 'app-categoria-plist',
  imports: [Paginacion, BotoneraRpp, TrimPipe, RouterLink],
  templateUrl: './categoria-plist.html',
  styleUrl: './categoria-plist.css',
})
export class CategoriaAdminPlistRouted {

  oPage: IPage<ICategoria> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  rellenaCantidad: number = 10;
  rellenando: boolean = false;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;
  publishingId: number | null = null;
  publishingAction: 'publicar' | 'despublicar' | null = null;

  // Mensajes y total
  message: string | null = null;
  totalRecords: number = 0;
  private messageTimeout: any = null;

  // Variables de ordenamiento
  orderField: string = 'id';
  orderDirection: 'asc' | 'desc' = 'asc';

  constructor(private oCategoriaService: CategoriaService, private route: ActivatedRoute) { }

  ngOnInit() {
    const msg = this.route.snapshot.queryParamMap.get('msg');
    if (msg) {
      this.showMessage(msg);
    }
    this.getPage();
  }

  private showMessage(msg: string, duration: number = 4000) {
    this.message = msg;
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.messageTimeout = setTimeout(() => {
      this.message = null;
      this.messageTimeout = null;
    }, duration);
  }

  getPage() {
    this.oCategoriaService.getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection).subscribe({
      next: (data: IPage<ICategoria>) => {
        this.oPage = data;
        this.totalRecords = data?.totalElements ?? 0;
        if (this.numPage > 0 && this.numPage >= data.totalPages) {
          this.numPage = data.totalPages - 1;
          this.getPage();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  onOrder(order: string) {
    if (this.orderField === order) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = order;
      this.orderDirection = 'asc';
    }
    this.numPage = 0;
    this.getPage();
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.numPage = 0;
    this.getPage();
  }

  onCantidadChange(value: string) {
    this.rellenaCantidad = +value;
  }

}
