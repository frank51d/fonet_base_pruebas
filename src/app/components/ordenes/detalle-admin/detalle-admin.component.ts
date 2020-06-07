import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MaterialesService } from '../../../services/materiales.service';
import { PhotoService } from '../../../services/photo.service'
import { DatePipe, Location } from '@angular/common';
import { ComunService } from 'src/app/services/comun.service';
import { ListarOrdenesComponent } from 'src/app/components/ordenes/listar-ordenes/listar-ordenes.component'

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.component.html',
  styleUrls: ['./detalle-admin.component.css']
})
export class DetalleAdminComponent implements OnInit {

  orden :any = [];
  materiales: any = [];
  tecnico: any = [];
  photos = []

  constructor(
    private _servicio: MaterialesService,
    private route: Router,
    private activedRouter : ActivatedRoute,
    private _dates: DatePipe,
    private _photo: PhotoService,
    private _location: Location,
    private _comun: ComunService
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
      );
      this._servicio.getListar(params.id).subscribe(
        res => {
          console.log(res),
          this.materiales = res
          this.show()
        },
        err => console.error(err)
      );
      this._photo.getPhotos(params.id).subscribe(
        res => {
          this.photos = res
        },
        err => console.log(err)
      )
      console.log(this._comun.p)
    } 

    
    // this._servicio.getUsuarioByID(this.orden.id).subscribe(
    //   res => {
    //     console.log(res)
    //     this.tecnico = res
    //   },
    //   err => console.log(err)
    // )

  }

  show(){
    
    this._servicio.getUsuarioByID(this.orden.id).subscribe(
      res => {
        console.log(res)
        this.tecnico = res
      },
      err => console.log(err)
    )
  }

  goB(){
    this._location.back();
  }

}
