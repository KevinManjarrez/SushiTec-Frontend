import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiProvider } from '../../providers/api.prov';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-modal.component.html',
  styleUrl: './cliente-modal.component.css'
})
export class ClienteModalComponent {
  public new = true;
  public clienteId = "";
  public nombres = "";
  public aPaterno = "";
  public aMaterno = "";
  public fecNac = "";


  constructor(
    public dialogRef: MatDialogRef<ClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiProv: ApiProvider
  ) {
    this.new = data.new;
    this.clienteId = data.clienteId;
    this.nombres = data.nombres;
    this.aPaterno = data.aPaterno;
    this.aMaterno = data.aMaterno;
    this.fecNac = data.fecNac;
  }


  public createCliente() {
    const data = {
      nombres: this.nombres,
      aPaterno: this.aPaterno,
      aMaterno: this.aMaterno,
      fecNac: this.fecNac,
    }
    this.apiProv.createCliente(data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Cliente Creado",
            icon: "success"
          });
          this.onClose()
        }
      }
    );
  }

  public updateCliente(): void {
    const data = {
      nombres: this.nombres,
      aPaterno: this.aPaterno,
      aMaterno: this.aMaterno,
      fecNac: this.fecNac,
    }

    this.apiProv.updateCliente(this.clienteId, data)
    .then(
      (res) => {
        if(res){
          Swal.fire({
            title: "Cliente Actualizado",
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
