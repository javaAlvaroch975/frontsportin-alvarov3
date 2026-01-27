export interface ITipoArticulo {
    id: number;
    descripcion: string;
    club?: any;
    articulos?: number;
}

export interface IArticulo {
    id: number;
    descripcion: string;
    precio: number;
    descuento: number | null;
    imagen: Blob | null;
    tipoarticulo: ITipoArticulo;
    comentarioarts?: number;
    compras?: number;
    carritos?: number;
}