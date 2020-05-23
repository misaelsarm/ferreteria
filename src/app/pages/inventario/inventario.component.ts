import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})

export class InventarioComponent implements OnInit {

  productos = []

  constructor(private afs: AngularFirestore, private ferreteriaService: FerreteriaService) { }

  ngOnInit(): void {
    this.ferreteriaService.obtenerProductos().subscribe(items => {
      this.productos = items;
      console.log(this.productos);
    })
  }

  /* async OnclickSubmit() {
    const id = new Date();

    const { value: formValues } = await Swal.fire({
      title: 'Registro de producto',
      html:
        '<label>Nombre del producto:</label>' +
        '<input autocomplete="off" id="nombre" class="swal2-input">' +
        '<label>Precio:</label><br>' +
        '<input autocomplete="off" type="number" id="precio" class="swal2-input"><br>' +
        '<label>Descripción:</label>' +
        '<input autocomplete="off" id="descripcion" class="swal2-input">' +
        '<label>Marca:</label>' +
        '<input id="marca" class="swal2-input">' +
        '<label>En existencia:</label><br>' +
        '<input autocomplete="off" type="number" id="enExistencia" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [];
      }
    });
    if (formValues) {
      this.afs.collection('Products').doc(id.getTime().toString()).set({
        nombre: (document.getElementById('nombre') as HTMLInputElement).value,
        precio: (document.getElementById('precio') as HTMLInputElement).value,
        descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
        marca: (document.getElementById('marca') as HTMLInputElement).value,
        enExistencia: (document.getElementById('enExistencia') as HTMLInputElement).value
      });
    }
  }
 */

}
