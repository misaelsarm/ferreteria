export class Item {
    id: number;
    nombre: string;
    precio: number;
    imagenURL: string;
    descripcion?: string;

    constructor(id: number, nombre: string, precio: number, imagenURL: string, descripcion?: string) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagenURL = imagenURL;
        this.descripcion = descripcion;
    }
}