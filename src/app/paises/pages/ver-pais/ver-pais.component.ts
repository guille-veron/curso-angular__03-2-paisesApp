import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';

import { switchMap, tap } from "rxjs/operators";
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!:Pais;
  
  constructor(private activatedRoute: ActivatedRoute,
              private paisService:PaisService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe( //switchMap me intercambia los observables params por pais (la respuesta del service)
        switchMap(({id}) => this.paisService.getPaisPorCod(id)),
        tap(resp => console.log(resp[0])) //efecto secundario
      )
      .subscribe(pais => this.pais = pais[0]) 
  
    //   this.activatedRoute.params
  //     .subscribe(({id}) => {
  //       this.paisService.getPaisPorCod(id)
  //         .subscribe(pais => {
  //           console.log(pais);
  //         })
  //       console.log(  id);
  //     })
  }

}
