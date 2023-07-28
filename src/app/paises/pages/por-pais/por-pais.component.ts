import { Component, OnInit } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor:pointer;
    }
  `]
})
export class PorPaisComponent implements OnInit {
  termino:string='';
  hayError:boolean = false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  mostrarSugeridos:boolean = false;

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
    this.paises = this.paisService.cacheStore.byPais.paises;    
    this.termino = this.paisService.cacheStore.byPais.term;
  }

  buscar(termino:string){        
    this.hayError = false;
    this.termino = termino;
    this.paisService.cacheStore.byPais.term = termino;
    this.mostrarSugeridos = false;

    this.paisService.buscarPais(this.termino)
      .subscribe((paises) => {
        if (paises.length === 0) {
          this.hayError = true;  
        }
        this.paises = paises;
        console.log(paises);
      })
    //this.termino = '';
  }

  sugerencias(termino:string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugeridos = true;
    this.paisService.buscarPais(termino)
      .subscribe((paises) => { this.paisesSugeridos = paises.splice(0,5)});
  }
  

}
