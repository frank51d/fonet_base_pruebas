import { Component, OnInit } from '@angular/core';
import { MaterialesService } from '../../../services/materiales.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './../../login/login.component';
import { ComunService } from '../../../services/comun.service';

@Component({
  selector: 'app-listar-ordenes',
  templateUrl: './listar-ordenes.component.html',
  styleUrls: ['./listar-ordenes.component.css']
})
export class ListarOrdenesComponent implements OnInit {


  constructor(
    private _servicio: MaterialesService,
    private _dates: DatePipe,
    private _comun: ComunService,
    private activedRouter: ActivatedRoute
  ) { }

  p : number = 1;

  ordenes_fecha: any = [];
  ordenes: any = [];
  estatus: any = "";
  authority: string = "user";

  filtrado: any = {
    estatus : "",
    tipo : "",
    cliente : "",
    usuario : ""
  }

  ngOnInit() {
    const params = this.activedRouter.snapshot.params;
    // this._servicio.getOrdenes().subscribe(
    //  res => {
    //    this.ordenes = res   
    //    console.log(res)
    //  },
    //  err => console.error(err),
    // );
    //this._servicio.getByUser(params.user)

    this._comun.getCurrent();

    if (this._comun.authority == 'admin') {
      this._servicio.getOrdenes().subscribe(
        res => {
          this.ordenes = res
          this.authority = 'admin'
          console.log(this.ordenes)
        }
      )
    } else { 
      if (params.user) {
        this._servicio.getByUser(params.user).subscribe(
          res => {
            this.ordenes = res
            console.log(res)
          },
          err => console.error(err),
        );
      }
    }
}

buscar(){
  this._servicio.getFiltrado(this.filtrado).subscribe(
    res => {
      this.ordenes = res
      console.log(res)
    }
  )
}

}
