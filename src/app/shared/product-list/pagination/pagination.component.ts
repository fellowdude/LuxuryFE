import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent implements OnInit {
  @Output() onClick = new EventEmitter(true);

  constructor() {}

  ngOnInit(): void {
  }

  changePage(page: number): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    this.onClick.emit(page);
  }
}
