export enum Roles {
    Admin = 'Admin',
    ReadOnly = 'ReadOnly'
}

export class UsuarioModel {
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    password: string;
    email: string;
    tipoUsuario: Roles.ReadOnly;
    confirmPassword: string;
}

/* const order = {
    user: {
        user_id: 1,
        user_name: 'test'
    },

    product: {
        product_id: 1,
        product_name: 'product',
        product_selected_qty: 1
    },
    order_id: 22434,
    order_status: 'Pending', // o liquidado
    order_date: '05-11-2020'
};
 */
