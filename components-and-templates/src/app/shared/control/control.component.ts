import {
  afterNextRender,
  afterRender,
  Component,
  ContentChild,
  ElementRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  // @HostBinding('class') className = 'control'; <-- discouraged
  // @HostListener('click') onClick() {
  //   console.log('clicked')
  // } <-- discouraged
  @Input({ required: true }) label!: string;
  @ContentChild('input') private control?: ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  >;

  private el = inject(ElementRef);

  // private control =
  //   contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    afterRender(() => {
      console.log('afterRender');
    });

    afterNextRender(() => {
      console.log('afterNextRender');
    });
  }

  onClick() {
    console.log('clicked');
    console.log(this.el.nativeElement);
    console.log(this.control);
    // console.log(this.control());
  }
}
