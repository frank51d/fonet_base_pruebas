import { Component, OnInit} from '@angular/core';
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
  
  p: number;
  ordenes_fecha: any = [];
  ordenes: any = [];
  estatus: any = "";
  authority: string = "user";
  toDelete: number = 0;
  toAnular: number = 0;
  orden : any = {
    idestatus_orden : 6,
    motivo_susp : ''
  }
  motivo_susp : string = "";

  filtrado: any = {
    estatus : "",
    tipo : "",
    cliente : "",
    usuario : ""
  }

ngOnInit() {
  const params = this.activedRouter.snapshot.params;

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
  this.p = this._comun.p
  console.log(this.p)
}

buscar(){
  this._servicio.getFiltrado(this.filtrado).subscribe(
    res => {
      this.ordenes = res
      console.log(res)
    }
  )
}

deleteOrden(){
 this._servicio.deleteOrden(this.toDelete).subscribe(
   res => {
     console.log(res);
   },
   err => console.log(err)
 )
 }

 prev(){
  this._comun.p = this.p
 }

 anular(){
   this._servicio.getOneOrder(this.toAnular).subscribe(
     res => {
       this.orden.idestatus_orden = 6;
       this.orden.motivo_susp = this.motivo_susp;
       this._servicio.updateOrden(this.toAnular, this.orden).subscribe(
         ret => {
           console.log(ret)
         },
         err => console.error(err)
       )
     }
   )
 }

}
