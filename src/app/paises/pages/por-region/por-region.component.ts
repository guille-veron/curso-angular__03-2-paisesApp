import { Component} from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { Region } from '../../interfaces/region.type';



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

  regiones :Region[] = [ 'africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva?: Region;  
  
  paises: Pais[] = [];

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
    this.paises = this.paisService.cacheStore.byRegion.paises;    
    this.regionActiva = this.paisService.cacheStore.byRegion.region;
  }

  activarRegion(region:Region){
    if(region === this.regionActiva){return;}
    this.regionActiva = region;
    this.paisService.cacheStore.byRegion.region = region;
    this.paises = [];
    this.paisService.buscarPaisPorRegion(region)
      .subscribe((paises) => {        
        this.paises = paises;
        console.log(paises);
      })
  }  
}
