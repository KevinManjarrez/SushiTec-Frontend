import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { ApiProvider } from '../../providers/api.prov'
import { MatDialog } from '@angular/material/dialog';
import { MenuModalComponent } from '../menu-modal/menu-modal.component';
import Swal from 'sweetalert2'
import { Nav2Component } from '../../shared/nav2/nav2.component';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Nav2Component],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public menus : any = [];
  constructor(
    private apiProv: ApiProvider,
    public dialog: MatDialog
  ){
    this.getMenus()
  }

  public getMenus(){
    this.apiProv.getMenus().then(res => {
      this.menus = res.data;
    })
  }

  public newMenuModal(){
    const dialogRef = this.dialog.open(MenuModalComponent, {
      data: {
        new: true
      },
      disableClose: true,
      hasBackdrop: true,
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getMenus();
    });
  }

  public updateMenuModal(menu: any){
    const dialogRef = this.dialog.open(MenuModalComponent, {
      data: {
        new: false,
        menuId: menu._id,
        name: menu.name,
        categoria: menu.categoria,
        ingredientes: menu.ingredientes,
        descripcion: menu.descripcion,
        precio: menu.precio,
        img: menu.img
      },
      disableClose: true,
      hasBackdrop: true,
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getMenus();
    });
  }

  public deleteMenu(menu: any){
    Swal.fire({
      showCancelButton: true,
      title: '¿Desea eleiminar menu: '+ menu.name + ' ?',
      confirmButtonText: "Confirmar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed) {
        this.apiProv.deleteMenu(menu._id)
        .then(
          (res) => {
            Swal.fire({
              title: "Menu Eliminado",
              icon: "success"
            });
            this.getMenus();
          }
        );
      }
    });
  }


}
