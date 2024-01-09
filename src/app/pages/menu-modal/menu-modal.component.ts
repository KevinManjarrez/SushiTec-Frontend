import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../../providers/api.prov';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-menu-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './menu-modal.component.html',
  styleUrl: './menu-modal.component.css'
})
export class MenuModalComponent {
  public new = true;
  public menuId = "";
  public name = "";
  public categoria = "";
  public ingredientes = "";
  public descripcion = "";
  public precio = "";
  public img = "";

  constructor(
    public dialogRef: MatDialogRef<MenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ) {
    this.new = data.new;
    this.menuId = data.menuId;
    this.name = data.name;
    this.categoria = data.categoria;
    this.ingredientes = data.ingredientes;
    this.descripcion = data.descripcion;
    this.precio = data.precio;
    this.img = data.img;
  }

  public createMenu() {
    const data = {
      name: this.name,
      categoria: this.categoria,
      ingredientes: this.ingredientes,
      descripcion: this.descripcion,
      precio: this.precio,
      img: this.img
    }
    this.apiProv.createMenu(data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Menu Creado",
            icon: "success"
          });
          this.onClose()
        }
      }
    );
  }

  public updateMenu(): void {
    const data = {
      name: this.name,
      categoria: this.categoria,
      ingredientes: this.ingredientes,
      descripcion: this.descripcion,
      precio: this.precio,
      img: this.img
    }

    this.apiProv.updateMenu(this.menuId, data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Menu Actualizado",
            icon: "success"
          });
          this.onClose()
        }
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }
}
