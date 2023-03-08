import { Component} from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button{
      margin-right:5px;
    }
  `]
})
export class PorRegionComponent{

  regiones :string[] = [ 'africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';  
  
  paises: Pais[] = [];

  constructor(private paisService:PaisService) { }

  activarRegion(region:string){
    if(region === this.regionActiva){return;}
    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarPaisPorRegion(region)
      .subscribe((paises) => {        
        this.paises = paises;
        console.log(paises);
      })
  }  
}
