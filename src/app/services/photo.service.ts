import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/Photo'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  API_URI = "http://localhost:3000/api"

  constructor(
    private _http: HttpClient
  ) { }

subirFoto(idorden: string, photo: File){
  const fd = new FormData();
  fd.append('idorden', idorden);
  fd.append('image', photo);
  return this._http.post(`${this.API_URI}/photos`, fd);
}

getPhotos(id: number){
  return this._http.get<Photo[]>(`${this.API_URI}/photos/${id}`)
}

}
