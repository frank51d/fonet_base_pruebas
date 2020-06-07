import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MaterialesService } from '../../../services/materiales.service';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  orden :any = []
  updateEstatus: any = {
    idestatus_orden: 0,
    hora_inicio: new Date()
  }

  constructor(
    private _servicio: MaterialesService,
    private route: Router,
    private activedRouter : ActivatedRoute,
    private _dates: DatePipe,
    private _location: Location
    ) { }

  ngOnInit() {

    const params = this.activedRouter.snapshot.params;
    if(params.id){
      this._servicio.getOneOrder(params.id).subscribe(
        res => {
          console.log(res),
          this.orden = res
        },
        err => console.error(err)
      )
    } 
  }

  iniciarOrden(){
    var date = new Date();
    var newDate = this._dates.transform(date, 'yyyy-MM-dd');
    var inicio = this._dates.transform(date, 'hh:mm:ss') 
    this.updateEstatus.hora_inicio = inicio
    //this.updateEstatus.fecha_ejecucion = newDate
    this.updateEstatus.idestatus_orden = 2
    this._servicio.updateEstatusOrden(this.orden.idorden, this.updateEstatus)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.error(err)
      )
  }

  goB(){
    this._location.back();
  }

}
