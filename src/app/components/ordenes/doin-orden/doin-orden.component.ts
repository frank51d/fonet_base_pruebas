import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MaterialUti } from '../../../models/materialUti'
import { ordenCerrada } from '../../../models/ordenCerrada'
import { DatePipe } from '@angular/common'
import { MaterialesService } from '../../../services/materiales.service';
import { PhotoService } from '../../../services/photo.service'

//

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

import { HttpClient } from '@angular/common/http';
import { ComunService } from '../../../services/comun.service'


@Component({
  selector: 'app-doin-orden',
  templateUrl: './doin-orden.component.html',
  styleUrls: ['./doin-orden.component.css']
})
export class DoinOrdenComponent implements OnInit {

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];

  //variables para subir imagenes
  file: File[] = [];
  photoSelected: string[] | ArrayBuffer = [];

  i = 0;
  j = 0;
  orden: any = [];
  materiales: any = [];

  seleccion: string = "btn-primary";
  listaCompleta: any = [];
  listaFinal: any = [];
  //listaMaterialUti: MaterialUti = {
  //idorden: 0,
  //idmaterial: 0,
  // cantidad: 0
  //}
  ordenCerrada: any = {
    idestatus_orden: 0,
    fecha_ejecucion: new Date(),
    hora_fin: new Date(),
    diagnostico_final: ''
  }

  constructor(
    private _servicio: MaterialesService,
    private activedRouter: ActivatedRoute,
    private _dates: DatePipe,
    private router: Router,
    private _comun: ComunService,
    private http: HttpClient,
    private _photoServ: PhotoService
  ) { }

  ngOnInit() {
    const params = this.activedRouter.snapshot.params;
    if (params.id) {
      this._servicio.getOneOrder(params.id).subscribe(
        res => {
          console.log(res),
            this.orden = res
        },
        err => console.error(err)
      )
    }
    //var newDate = this._dates.transform(this.date, 'yyyy-MM-dd');
  }

  listarMateriales() {
    this._servicio.getMateriales().subscribe(
      res => {
        this.materiales = res
      },
      err => console.error(err)
    )
  }

  cerrarOrden() {
    this.ordenCerrada.idestatus_orden = 3;
    var date = new Date();
    var newDate = this._dates.transform(date, 'yyyy-MM-dd');
    var final = this._dates.transform(date, 'hh:mm:ss')
    var dateAsig = this._dates.transform(this.orden.fecha_asig, 'yyyy-MM-dd')
    var dateRep = this._dates.transform(this.orden.fecha_reporte, 'yyyy-MM-dd')
    this.ordenCerrada.fecha_ejecucion = newDate
    this.ordenCerrada.hora_fin = final
    //this.ordenCerrada.fecha_asig = dateAsig
    //this.ordenCerrada.fecha_reporte = dateRep
    console.log(this.ordenCerrada)
    this._servicio.updateCerrarOrden(this.orden.idorden, this.ordenCerrada).subscribe(
      res => {
        console.log(res)
      },
      err => console.error(err)
    )
    for (let i = 0; i < this.listaFinal.length; i++) {
      this._servicio.insertLista(this.listaFinal[i]).subscribe(
        res => {
          console.log(res)
        },
        err => console.error(err)
      )
    }
    this.subir();
    this.router.navigate(['/inicio']);
  }
  cantidad = [];
  cantidad2 = [];
  agregarMat(id, descripcion) {

    let listaMaterialUti = {};
    let listaMaterialUti2 = {};

    //this.listaMaterialUti[this.i] = this.orden.idorden;
    //this.listaMaterialUti[this.i+1] = id;
    // this.listaMaterialUti[this.i+2] = cantidad;
    //this.listaCompleta[this.j] = this.listaMaterialUti;
    this.cantidad[this.i] = 1

    this.listaCompleta[this.i] = listaMaterialUti;
    this.listaCompleta[this.i].idorden = this.orden.idorden
    this.listaCompleta[this.i].idmaterial = id
    this.listaCompleta[this.i].descripcion = descripcion
    this.listaCompleta[this.i].cantidad = this.cantidad[this.i]

    this.listaFinal[this.i] = listaMaterialUti2;
    this.listaFinal[this.i].idorden = this.orden.idorden
    this.listaFinal[this.i].idmaterial = id
    this.listaFinal[this.i].cantidad = this.cantidad[this.i]

    this.i++;
  }

  quitarMat(index) {

    // this.listaCompleta[index] = {};
    // this.ngOnInit();
    this.listaCompleta.splice(index, 1);

    // this.listaFinal[index] = {};
    // this.ngOnInit();
    this.listaFinal.splice(index, 1);
    this.cantidad.splice(index, 1);
    this.i = this.i - 1;

  }

  verLista() {
    //console.log(this.listaMaterialUti);
    console.log(this.i);
    console.log(this.listaFinal);
    console.log(this.cantidad);
  }

  suma(index) {
    this.cantidad[index] = this.cantidad[index] + 1
    this.listaFinal[index].cantidad = this.cantidad[index]
  }

  restar(index) {
    this.cantidad[index] = this.cantidad[index] - 1
    this.listaFinal[index].cantidad = this.cantidad[index]
  }

  onPhotoSelected(event : HtmlInputEvent): void{
    if(event.target.files && event.target.files[0]){
      for (let i = 0; i < event.target.files.length; i++) {
        this.file[i] = <File>event.target.files[i]
        const reader = new FileReader();
      reader.onload = e => this.photoSelected[i] = reader.result;

      reader.readAsDataURL(this.file[i])
      console.log(this.file[i])
      console.log(this.photoSelected[i])
      }
      // vista de la imagen

    }
  }

  subir(): boolean{
    for (let i = 0; i < this.file.length; i++) {
      this._photoServ.subirFoto(this.orden.idorden, this.file[i]).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }
    return false
  }

  // onPhotoSelected(event: HtmlInputEvent): void {
  //   if (event.target.files && event.target.files[0]) {

  //     this.file = <File>event.target.files[0]
  //     const reader = new FileReader();
  //     reader.onload = e => this.photoSelected = reader.result;

  //     reader.readAsDataURL(this.file)
  //     console.log(this.file)
  //     console.log(this.photoSelected)

  //     // vista de la imagen

  //   }
  // }

}
