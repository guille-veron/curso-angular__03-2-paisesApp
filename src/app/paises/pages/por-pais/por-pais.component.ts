import { Component } from '@angular/core';
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
export class PorPaisComponent {
  termino:string='';
  hayError:boolean = false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  mostrarSugeridos:boolean = false;

  constructor(private paisService:PaisService) { }

  buscar(termino:string){        
    this.hayError = false;
    this.termino = termino;
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
