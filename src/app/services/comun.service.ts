import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComunService {

  tokenMkw : string = "eURGUHVuY2ZSbWkweXNXbVlVT0pZZz09";
  isLogin = false;
  roles: string[];
  authority: string;
  userCurrent: string;
  SERVER_URL: string = "https://file.io/";
  p: number = 1;

  constructor(private tokenService: TokenService, private httpClient: HttpClient) { }

  current: string = '';

  getCurrent(){
    if (this.tokenService.getToken()) {
        this.isLogin = true;
        this.roles = [];
        this.roles = this.tokenService.getAuthorities();
        this.roles.every(rol => {
          if (rol === 'ROLE_ADMIN') {
            this.authority = 'admin';
            return false;
          }
          this.authority = 'user';
          return true;
        });
      }
  }

  downloadFile(data, filename='data') {
    let csvData = this.ConvertToCSV(data, ['idorden','estatus', 'tipo', 'tecnico', 'nombres_cliente', 'fecha_reporte', 'fecha_asig']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = 'S.No,';

     for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         for (let index in headerList) {
            let head = headerList[index];

             line += ',' + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
 }

 public upload(formData) {

	return this.httpClient.post<any>(this.SERVER_URL, formData, {  
      reportProgress: true,  
      observe: 'events'  
    });  
}


}
