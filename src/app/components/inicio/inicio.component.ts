import { Component, OnInit, Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { Router, CanActivate } from '@angular/router';
import { MaterialesService } from '../../services/materiales.service';
import { TokenService } from '../../services/token.service';
import { ComunService } from '../../services/comun.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

@Injectable()
export class InicioComponent implements OnInit {

  current: string = '';

  chart1: any;
  chart2: any;
  chart3: any;
  chart4: any;

  data_mes: any = [];
  meses: any = [];
  cantidad_meses: any = [];
  data: any = [];
  vals: any = [];
  tecnico: any = [];
  tipo: any = [];
  info: any = {};
  d = new Date();
  howMany: any = [];
  abiertas: number = 0;
  en_proceso: number = 0;
  cerradas: number = 0;
  howManyType: any = [];
  authority: string = "user";
  isLogged = false;
  isLoginFail = false;

  constructor(
    private _servicio: MaterialesService,
    private tokenService: TokenService,
    private comun: ComunService,
    private router: Router
  ) { }

  ngOnInit() {
    this.current = this.comun.current;
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities()
    };

    this.comun.getCurrent();

    if (this.comun.authority == 'admin') {
      //si es el admin
      this._servicio.howManyAll().subscribe(
        res => {
          this.howMany = res
          this.authority = 'admin'
          this.aja()
        });
      this._servicio.geByTecnico().subscribe((res: any) => {
        this.data = res
        for (let i = 0; i < this.data.length; i++) {
          this.vals[i] = this.data[i].ordenes
        }
        for (let i = 0; i < this.data.length; i++) {
          this.tecnico[i] = this.data[i].tecnico
        }
        this.chart1.data.labels = this.tecnico
        this.chart1.data.datasets[0].data = this.vals
        this.chart1.update();
      });
      this._servicio.ordenesPmes().subscribe((res: any) => {
        this.data_mes = res
        for (let i = 0; i < this.data_mes.length; i++) {
          this.meses[i] = this.data_mes[i].mes
        }
        for (let i = 0; i < this.data_mes.length; i++) {
          this.cantidad_meses[i] = this.data_mes[i].cantidad
        }
        this.chart2.data.labels = this.meses
        this.chart2.data.datasets[0].data = this.cantidad_meses
        this.chart2.update();
      });
      this.chart1 = new Chart('canvas1', {
        type: 'doughnut',
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Órdenes de Servicio por Técnico'
          },
        },
        data: {
          labels: ['Jan', 'Feb'],
          datasets: [
            {
              type: 'doughnut',
              label: 'Test Chart',
              backgroundColor: ['#929292', '#3C93E8', '#4ED5FF', '#3CE8E3'],
              data: [10, 3, 6],
              fill: false
            }
          ]
        },
      });
      this.chart2 = new Chart('canvas2', {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Órdenes',
            barPercentage: 1,
            barThickness: 60,
            maxBarThickness: 60,
            minBarLength: 2,
            backgroundColor: [
              '#4270FF',
              '#3C93E8',
              '#4ED5FF',
              '#3CE8E3',
              '#42FFC4',
              '#4683E8',
              '#596BFF',
              '#5E46E8',
              '#984DFF',
              '#884AE8',
              '#CA5EFF',
              '#DE4AE8']
            //data: [10, 20, 30, 40, 50, 60, 70]
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Órdenes de Servicio Por Mes'
          },
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      });
    } else {
      //si es un tecnico
      this._servicio.howManyOrder(this.comun.current).subscribe(
        res => {
          this.howMany = res
          this.aja()
        });
      this._servicio.howManyByType(this.comun.current).subscribe((res: any) => {
        this.data = res
        for (let i = 0; i < this.data.length; i++) {
          this.vals[i] = this.data[i].cantidad
        }
        for (let i = 0; i < this.data.length; i++) {
          this.tipo[i] = this.data[i].tipo
        }
        this.chart3.data.labels = this.tipo
        this.chart3.data.datasets[0].data = this.vals
        this.chart3.update();
      });
      this._servicio.ordenesPmesByTec(this.comun.current).subscribe((res: any) => {
        this.data_mes = res
        for (let i = 0; i < this.data_mes.length; i++) {
          this.meses[i] = this.data_mes[i].mes
        }
        for (let i = 0; i < this.data_mes.length; i++) {
          this.cantidad_meses[i] = this.data_mes[i].cantidad
        }
        this.chart4.data.labels = this.meses
        this.chart4.data.datasets[0].data = this.cantidad_meses
        this.chart4.update();
      });
      this.chart3 = new Chart('canvas3', {
        type: 'doughnut',
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Órdenes Ejecutadas Por Tipo en el Mes'
          },
        },
        data: {
          //labels: ['Jan', 'Feb'],
          datasets: [
            {
              type: 'doughnut',
              label: 'Test Chart',
              backgroundColor: ['#4270FF', '#3C93E8', '#4ED5FF'],
              //data: [10, 3, 6],
              fill: false
            }
          ]
        },
      });
      this.chart4 = new Chart('canvas4', {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Órdenes',
            barPercentage: 1,
            barThickness: 60,
            maxBarThickness: 60,
            minBarLength: 2,
            backgroundColor: [
              '#4270FF',
              '#3C93E8',
              '#4ED5FF',
              '#3CE8E3',
              '#42FFC4',
              '#4683E8',
              '#596BFF',
              '#5E46E8',
              '#984DFF',
              '#884AE8',
              '#CA5EFF',
              '#DE4AE8']
            //data: [10, 20, 30, 40, 50, 60, 70]
          }]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Órdenes de Servicio Ejecutadas Por Mes'
          },
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      });
    }
  }

  aja() {
    for (let i = 0; i < this.howMany.length; i++) {
      if (this.howMany[i].idestatus_orden == 1) {
        this.abiertas = this.howMany[i].cantidad;
      }
      if (this.howMany[i].idestatus_orden == 2) {
        this.en_proceso = this.howMany[i].cantidad;
      }
      if (this.howMany[i].idestatus_orden == 3) {
        this.cerradas = this.howMany[i].cantidad;
      }
    }
    console.log(this.authority)
  }

}
