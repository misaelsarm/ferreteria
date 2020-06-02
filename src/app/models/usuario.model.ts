export enum Roles {
    Administrador = 'Administrador',
    Cliente = 'Cliente'
}

export class UsuarioModel {
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    password: string;
    email: string;
    tipoUsuario: string;
    confirmPassword: string;
}
