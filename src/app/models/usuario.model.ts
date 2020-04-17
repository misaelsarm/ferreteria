enum Roles {
    admin,
    readOnly
}

export class UsuarioModel {
    nombre: string;
    password: string;
    email: string;
    tipoUsuario: Roles.readOnly;
}
/* 
const order = {

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
    order_date: '05-11-2020',

}; */

