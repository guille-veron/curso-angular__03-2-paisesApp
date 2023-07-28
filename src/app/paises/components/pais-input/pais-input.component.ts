import { Component, EventEmitter, Output , OnInit, Input, OnDestroy} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from "rxjs/operators";

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit, OnDestroy{  
  @Input() placeholder:string = '';
  @Input() initialValue:string = '';
  @Output() onEnter:EventEmitter<string> = new EventEmitter();
  @Output() onDebounce:EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();
  private debouncerSubscription?: Subscription;
  
  constructor(private paisService:PaisService) { }
  
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  ngOnInit(){
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe(valor => {
        this.onDebounce.emit(valor)
      })
  }

  buscar(valor:string){
    this.onEnter.emit(valor);    
  }

  teclaPresionada(valor: string){
    this.debouncer.next(valor);
  }
  
}
