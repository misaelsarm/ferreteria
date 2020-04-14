export class Item {
    id: number;
    nombre: string;
    precio: number;
    imagenURL: string;
    descripcion: string;
    marca?: string;
    enExistencia?: boolean;
    enExistenciaDisponibles?: number;

    constructor(
        id: number,
        nombre: string,
        precio: number,
        imagenURL: string,
        descripcion?: string,
        marca?: string,
        enExistencia?: boolean,
        enExistenciaDisponibles?: number) {

        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagenURL = imagenURL;
        this.descripcion = descripcion;
        this.marca = marca;
        this.enExistencia = enExistencia;
        this.enExistenciaDisponibles = enExistenciaDisponibles;
    }
}