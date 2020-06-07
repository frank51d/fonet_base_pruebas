import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialesService } from '../../../services/materiales.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {
  
  usuarios: any = [];
  tipoOrdenes: any = [];
  ordenServicio :any = []

  constructor(
    private _servicio: MaterialesService,
    private route: Router,
    private activedRouter : ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    const params = this.activedRouter.snapshot.params;
    if(params.id){
      this._servicio.getOneOrder(params.id).subscribe(
        res => {
          console.log(res),
          this.ordenServicio = res
        },
        err => console.error(err)
      )
    }
    this._servicio.getUsuarios().subscribe(
      res => {
        this.usuarios = res
      },
      err => console.error(err)
    );
    this._servicio.getTipoOrden().subscribe(
      res => {
        this.tipoOrdenes = res
      },
      err => console.log(err)
    ); 
  }

  editOrden(){
    this._servicio.updateOrden(this.ordenServicio.idorden, this.ordenServicio).subscribe(
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
