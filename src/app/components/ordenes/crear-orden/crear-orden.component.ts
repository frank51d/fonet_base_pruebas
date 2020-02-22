import { Component, OnInit, Input } from '@angular/core';
import { MaterialesService } from './../../../services/materiales.service';
import { ClientesService } from '../../../services/clientes.service';
import { ComunService } from '../../../services/comun.service'
import { DatePipe } from '@angular/common';
import { Consulta } from 'src/app/consulta';
import { ordenServicio } from '../../../models/orden';
import { FormBuilder, FormGroup, Validators, NgForm, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})

export class CrearOrdenComponent implements OnInit {

  @Input() user: string;

  plat = {
    idplataforma: 0
  }
  plataformas: any = [];
  plataformasResp: any = [];
  usuarios: any = [];
  currentDate: {};
  tipoOrdenes: any = [];
  myForm: FormGroup;

  ordenServicio: any = {
    idestatus_orden: 1,
    idtipo_orden: 0,
    id: 0,
    nombres_cliente: '',
    telefono_cliente: '',
    movil_cliente: '',
    direccion_cliente: '',
    ppp_user: '',
    ppp_pass: '',
    fecha_reporte: new Date(),
    fecha_asig: new Date(),
    fecha_ejecucion: Date,
    hora_inicio: 0,
    hora_fin: 0,
    diagnostico_inicial: '',
    diagnostico_final: '',
    coordenada: 0
  }


  clienteMkw: any = [];

  data: string;
  postData: Consulta = {
    token: '',
    idcliente: 0
  };

  registerForm: FormGroup;
  submitted = false;

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private _servicio: MaterialesService,
    private _servicioCliente: ClientesService,
    private _dates: DatePipe,
    private formBuilder: FormBuilder,
    private router: Router,
    private _comun: ComunService
  ) { }

  ngOnInit() {

    this.postData.token = this._comun.tokenMkw;

    this.registerForm = this.formBuilder.group({
      nombres_cliente: ['', Validators.required]
    })

    //vvvvvvvvvvv
    this._servicio.getPlataformas().subscribe(
      res => {
        this.plataformas = res
      },
      err => console.error(err)
    )
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
    this.currentDate = new Date();

    //-----------------------------------  
    var date2 = new Date()
    var newDate2 = this._dates.transform(date2, 'yyyy-MM-dd');
    this.ordenServicio.fecha_asig = newDate2
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
 
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  get f() { return this.registerForm.controls; }

  sendId() {

    this._servicioCliente.getCliente(this.postData).subscribe(
      data => {
        console.log(this.postData)
        //guarda la respuesta del Mkw en el arreglo clienteMkw
        this.clienteMkw = data
        //asigno las propiedades que necesito de la respuesta del Mkw
        this.ordenServicio.nombres_cliente = this.clienteMkw.datos[0].nombre
        this.ordenServicio.direccion_cliente = this.clienteMkw.datos[0].direccion_principal
        this.ordenServicio.telefono_cliente = this.clienteMkw.datos[0].telefono
        this.ordenServicio.movil_cliente = this.clienteMkw.datos[0].movil
        this.ordenServicio.ppp_user = this.clienteMkw.datos[0].servicios[0].pppuser
        this.ordenServicio.ppp_pass = this.clienteMkw.datos[0].servicios[0].ppppass
        console.log(data)
      },
      err => console.error(err)
    );

  }

  getPlataforma(){
    
    this._servicio.getPlataforma(this.plat.idplataforma).subscribe(
      res => {
        this.plataformasResp[0] = res
        console.log(this.plataformasResp[0])
        this.ordenServicio.nombres_cliente = this.plataformasResp[0].descripcion
        this.ordenServicio.direccion_cliente = this.plataformasResp[0].direccion
      }
    )

  }

  crearOrden() {

    this.submitted = true;

    var date = new Date();
    var newDate = this._dates.transform(date, 'yyyy-MM-dd');
    this.ordenServicio.fecha_reporte = newDate;

    this._servicio.saveOrden(this.ordenServicio).subscribe(
      res => {
        console.log(res)
        console.log(this.ordenServicio)
      },
      err => console.error(err)
    )
    console.log(this.ordenServicio)
    alert('Orden creada con exito!');

    this.router.navigate(['/ordenes/listar']);

  }

}
