export class Item {
    id: number;
    nombre: string;
    precio: number;
    imagenURL: string;
    descripcion: string;
    marca?: string;
    enExistencia?: boolean;
    enExistenciaDisponibles?: number;
}