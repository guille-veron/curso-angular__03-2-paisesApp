import { Component, OnInit} from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino:string='';
  hayError:boolean = false;
  paises: Pais[] = [];
  isLoading:boolean = false;

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
    this.paises = this.paisService.cacheStore.byCapital.paises;    
    this.termino = this.paisService.cacheStore.byCapital.term;
  }

  buscar(termino:string){        
    this.hayError = false;
    this.termino = termino;
    this.paisService.cacheStore.byCapital.term = termino;
    this.isLoading = true;
    this.paisService.buscarPaisPorCapital(this.termino)
      .subscribe((paises) => {
        if (paises.length === 0) {
          this.hayError = true;  
        }
        this.isLoading = false;
        this.paises = paises;
        console.log(paises);
      })
    //this.termino = '';
  }

  sugerencias(termino:string){
    this.hayError = false;
    //TODO: sugerencias
  }

}
