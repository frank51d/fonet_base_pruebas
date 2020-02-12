import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Material } from '../models/material'
import { ordenServicio } from '../models/orden'
import { updateEstatusOrden } from '../models/updateEstatusOrden'
import { ordenCerrada } from '../models/ordenCerrada'
import { filtrado } from '../models/filtrado'
import { Observable } from 'rxjs';
import { PlatformLocation } from '@angular/common';
import { Plataforma } from '../models/plataforma';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  API_URI = 'https://fonetdf.herokuapp.com/api';

  constructor(private http:HttpClient) { }

  //peticiones a materiales

  getMateriales(){
    return this.http.get(`${this.API_URI}/materiales`);
  }

  getMaterial(id: number){
    return this.http.get(`${this.API_URI}/materiales/${id}`);
  }

  deleteMaterial(id: number){
    return this.http.delete(`${this.API_URI}/materiales/${id}`);
  }

  updateMaterial(id: number, updatedMaterial: Material){
    return this.http.put(`${this.API_URI}/materiales/${id}`, updatedMaterial);
  }

  saveMaterial(material: Material){
    return this.http.post(`${this.API_URI}/materiales`, material);
  }

  //peticiones plataforma

  getPlataformas(){
    return this.http.get(`${this.API_URI}/plataforma`);
  }

  getPlataforma(id: number){
    return this.http.get(`${this.API_URI}/plataforma/${id}`);
  }

  deletePlataforma(id: number){
    return this.http.delete(`${this.API_URI}/plataforma/${id}`);
  }

  updatePlataforma(id: number, updatedMaterial: Material){
    return this.http.put(`${this.API_URI}/plataforma/${id}`, updatedMaterial);
  }

  savePlataforma(plataforma: Plataforma){
    return this.http.post(`${this.API_URI}/plataforma`, plataforma);
  }

  //peticiones a usuarios

  getUsuarios(){
    return this.http.get(`${this.API_URI}/usuarios`);
  }

  getUsuarioByID(id: number){
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  }

  //peticiones a tipoOrden

  getTipoOrden(){
    return this.http.get(`${this.API_URI}/tipoOrden`);
  }

  saveTipoOrden(material: Material){
    return this.http.post(`${this.API_URI}/tipoOrden`, material);
  }

  //peticiones a ordenes

  getOrdenes(){
    return this.http.get(`${this.API_URI}/ordenes`);
  }

  getFiltrado(filtrado: filtrado){
    return this.http.post(`${this.API_URI}/ordenes/listar/fill/`, filtrado);
  }

  getByUser(user: any){
    return this.http.get(`${this.API_URI}/ordenes/listar/${user}`);
  }

  getOneOrder(id: number){
    return this.http.get(`${this.API_URI}/ordenes/${id}`);
  }

  updateOrden(id: number, updatedOrden: ordenServicio){
    return this.http.put(`${this.API_URI}/ordenes/${id}`, updatedOrden);
  }

  updateCerrarOrden(id: number, updatedOrden: ordenCerrada){
    return this.http.put(`${this.API_URI}/ordenes/${id}`, updatedOrden);
  }

  updateEstatusOrden(id: number, updatedOrden: updateEstatusOrden){
    return this.http.put(`${this.API_URI}/ordenes/${id}`, updatedOrden);
  }

  saveOrden(orden: ordenServicio){
    return this.http.post(`${this.API_URI}/ordenes`, orden);
    console.log("orden creada");
  }

  //charts

  geByTecnico(){
    return this.http.get(`${this.API_URI}/chart/tecnicos`);
  }

  howManyAll(){
    return this.http.get(`${this.API_URI}/chart/count`);
  }

  howManyOrder(user: any){
    return this.http.get(`${this.API_URI}/chart/count/${user}`);
  }

  ordenesPmes(){
    return this.http.get(`${this.API_URI}/chart/meses`);
  }

  howManyByType(user: any){
    return this.http.get(`${this.API_URI}/chart/tipoOrden/${user}`);
  }

  ordenesPmesByTec(user: any){
    return this.http.get(`${this.API_URI}/chart/meses/${user}`);
  }

  //materialesUti

  insertLista(lista){
    return this.http.post(`${this.API_URI}/materialesUti`, lista);
  }

  getListar(id: number){
    return this.http.get(`${this.API_URI}/materialesUti/${id}`);
  }

  //reportes

  listReporte(filtrado){
    return this.http.post(`${this.API_URI}/reportes`, filtrado);
  }

}
