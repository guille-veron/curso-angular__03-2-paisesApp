import { Component, EventEmitter, Output , OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{
  termino:string='';
  @Output() onEnter:EventEmitter<string> = new EventEmitter();
  @Output() onDebounce:EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();
  
  constructor(private paisService:PaisService) { }

  ngOnInit(){
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        this.onDebounce.emit(valor)
      })
  }

  buscar(){
    this.onEnter.emit(this.termino);    
  }

  teclaPresionada(){
    this.debouncer.next(this.termino);
  }
  
}
