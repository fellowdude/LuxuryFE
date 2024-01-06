import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface IAccordion {
  title: string;
  content: string;
  opened: boolean;
}

@Component({
  selector: 'app-single-accordion',
  templateUrl: './single-accordion.component.html',
  styleUrls: ['./single-accordion.component.scss'],
})
export class SingleAccordionComponent implements OnInit {
  @Input() accordion: IAccordion;
  @Input() additionalContentClasses: string;
  @Input() bold: false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  toggleAccordion(): void {
    this.accordion.opened = !this.accordion.opened;
  }

  safeHtml(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
