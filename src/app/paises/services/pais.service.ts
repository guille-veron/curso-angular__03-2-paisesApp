import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  get params(){
    return new HttpParams().set('fields','flags,name,population,cca2');
    }

  constructor(private http:HttpClient) { }

  buscarPais(name:string):Observable<Pais[]>{
    const url = `${this.apiUrl}/name/${name}`;    
    return this.http.get<Pais[]>(url,{params:this.params})
      .pipe(catchError((err) => of([])))
  }

  buscarPaisPorCapital(name:string):Observable<Pais[]>{
    const url = `${this.apiUrl}/capital/${name}`;    
    return this.http.get<Pais[]>(url,{params: this.params})
      .pipe(catchError((err) => of([])))
  }

  getPaisPorCod(id:string):Observable<Pais[]>{
    const url = `${this.apiUrl}/alpha/${id}`;    
    return this.http.get<Pais[]>(url)
      .pipe(catchError((err) => of([])))
  }

  buscarPaisPorRegion(name:string):Observable<Pais[]>{
    const url = `${this.apiUrl}/region/${name}`;    
    return this.http.get<Pais[]>(url,{params: this.params})
      .pipe(catchError((err) => of([])))
  }
}
