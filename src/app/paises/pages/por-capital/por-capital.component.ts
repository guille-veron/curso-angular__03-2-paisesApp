import { Component} from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  termino:string='';
  hayError:boolean = false;
  paises: Pais[] = [];

  constructor(private paisService:PaisService) { }

  buscar(termino:string){        
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPaisPorCapital(this.termino)
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
    //TODO: sugerencias
  }

}
