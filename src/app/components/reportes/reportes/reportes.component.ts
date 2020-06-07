import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ComunService } from '../../../services/comun.service';
import { DatePipe } from '@angular/common';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  var: string
  tipos: any= [];
  tecnicos: any= [];
  lista: any = [];
  idmats: any = [];
  mats: any = [];
  mat: any = {};
  filtrado: any = {
    tipo : '',
    usuario : '',
    cliente : '',
    fecha_ejecucion : '',
    fecha_asig : ''
  }
  filtrado2: any = {
    fecha_inicio : '',
    fecha_fin : ''
  }

  constructor(
    private _servicio: MaterialesService,
    private _comun: ComunService,
    private _dates: DatePipe
  ) { }

  ngOnInit() {
    this._servicio.getTipoOrden().subscribe(
      res => {
        this.tipos = res
      },
      err => console.error(err)
    );
    this._servicio.getUsuarios().subscribe(
      res => {
        this.tecnicos = res
      },
      err => console.error(err)
    );
  }

  buscar(){
    this._servicio.listReporte(this.filtrado).subscribe(
      res => {
        this.lista = res
        // console.log(res)
        // this.matsByOrden();
      },
      err => console.error(err)
    );
  }

  matsByOrden(){
    // for (let i = 0; i < this.lista.length; i++) {
    //   this.idmats[i]=this.lista[i].idorden;   
    // }
    // for (let j = 0; j < this.idmats.length; j++) {
    //   this._servicio.getListar(this.idmats[j]).subscribe(
    //     res => {
    //       this.mat = res
    //       console.log(this.mat)
    //       // if (this.mat.idorden==this.lista[j].idorden){
    //       //   this._servicio.getListar(this.lista[j].idorden).subscribe(
    //       //     res => {
    //       //       this.mats[j] = res;
    //       //     }
    //       //   )
    //       // }else{
    //       //   this.mats[j] = 0;
    //       // }
    //     }
    //   )   
    // }
    // // console.log(this.idmats)
    // // console.log(this.mats)
  }

  buscar2(){
    this._servicio.listReporte2(this.filtrado2).subscribe(
      res => {
        this.lista = res
        console.log(res)
      },
      err => console.error(err)
    )
  }

  download(){
    for (let i = 0; i < this.lista.length; i++) {
      this.lista[i].nombres_cliente = this.lista[i].nombres_cliente.replace(/\,/g,"");
      this.lista[i].fecha_ejecucion = this._dates.transform(this.lista[i].fecha_ejecucion, 'yyyy-MM-dd')
      this.lista[i].fecha_asig = this._dates.transform(this.lista[i].fecha_asig, 'yyyy-MM-dd')
    }
    this._comun.downloadFile(this.lista, 'reporte');
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
   }
  

}
