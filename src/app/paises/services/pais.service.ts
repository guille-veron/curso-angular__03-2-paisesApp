import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pais } from '../interfaces/pais.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term:'',paises:[]},
    byPais: {term:'',paises:[]},
    byRegion: {paises:[]}
  };

  get params(){
    return new HttpParams().set('fields','flags,name,population,cca2');
    }

  constructor(private http:HttpClient) { 
    this.loadLocalStorage();
  }

  private saveLocalStorage(){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore));
  }

  private loadLocalStorage(){
    if(!localStorage.getItem('cacheStore')){ return; }

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getPaisRequest(url:string):Observable<Pais[]> {
    return this.http.get<Pais[]>(url,{params:this.params})
      .pipe(catchError((err) => of([])))
  }

  buscarPais(name:string):Observable<Pais[]>{
    const url = `${this.apiUrl}/name/${name}`;    
    return this.getPaisRequest(url)
    .pipe(
      tap(paises => this.cacheStore.byPais = {term:name, paises}),
      tap(() => this.saveLocalStorage())
      );
  }

  buscarPaisPorCapital(name:string):Observable<Pais[]>{
    const url = `${this.apiUrl}/capital/${name}`;    
    return this.getPaisRequest(url)
      .pipe(
        tap(paises => this.cacheStore.byCapital = {term:name, paises}),
        tap(() => this.saveLocalStorage())
      );
  }

  getPaisPorCod(id:string):Observable<Pais[]>{
    const url = `${this.apiUrl}/alpha/${id}`;    
    return this.http.get<Pais[]>(url)
      .pipe(catchError((err) => of([])))
  }

  buscarPaisPorRegion(name: Region):Observable<Pais[]>{
    const url = `${this.apiUrl}/region/${name}`;    
    return this.getPaisRequest(url)
    .pipe(
      tap(paises => this.cacheStore.byRegion = {region:name, paises}),
      tap(() => this.saveLocalStorage())  
    );
  }
}
