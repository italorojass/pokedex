import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() link : any;
  @Output() outPaginator = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log('paginador',this.link);
  }
  paginate(href:any){
    this.outPaginator.emit(href);
  }
}
