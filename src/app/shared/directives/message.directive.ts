import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appMessage]',
})
export class MessageDirective implements OnInit {
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    let css = `position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      line-height: 1.7;
      padding: 20px;
      width: 300px;
      height: 160px;
      font-size: 20px;
      background-color: wheat;
      border-radius: 5px;
      color:red;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      z-index: 10;`;

    this.el.nativeElement.setAttribute('style', css);
  }
}
